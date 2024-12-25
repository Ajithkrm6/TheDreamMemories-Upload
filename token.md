Handling Refresh and Access Tokens:

Backend:

Generate access and refresh tokens during login.
Store the refresh token as an HTTP-only cookie.
Create a refresh token endpoint.
Implement middleware to verify the access token.
Apply middleware to protected routes.

Frontend:

Handle form submission and store the access token.
Use Axios interceptors to refresh the access token when it expires.

example of interceptor function
```
import axios from "axios";

//creating an axios instance
const apiInstance = axios.create({
    baseURL:process.env.REACT_APP_API_URL,
    withCredentials:false,
    headers:{
        "Content-Type":"application/json"
    }
})

//request the interceptor to add auth header
apiInstance.interceptors.request.use((config)=>{
const token = localStorage.getItem('token');
if(token){
    config.headers.Authorization = `Bearer ${token}`
}
return config;
});

//Response interceptor for handling errors
apiInstance.interceptors.response.use((response)=>response,(error)=>{
    if(error.response.status === 401){
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
})

export const api = async (config:any)=>{
    try{
        const response = await apiInstance({
            method:config.method,
            url:config.url,
            data:config.data,
            cancelToken:config.cancelToken,
            ...config
        })
        return response.data;
    }
    catch(err){
        if (axios.isAxiosError(err) && err.response) {
            return err.response.data;
        }
        throw err;
    }
}

```

same implementation using fetch method:

```
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Utility to create the headers, including Authorization
const createHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
};

// Centralized fetch function
export const api = async (config) => {
    const { method, url, data, ...rest } = config;

    const options = {
        method: method || "GET",
        headers: createHeaders(),
        credentials: "same-origin", // or "include" if you need to send cookies
        ...rest,
    };

    // Add body for POST, PUT, DELETE methods
    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, options);

        if (!response.ok) {
            // Handle 401 Unauthorized
            if (response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }

            // Extract and throw error details
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
        }

        // Parse response as JSON
        return await response.json();
    } catch (err) {
        console.error("Fetch API error:", err);
        throw err;
    }
};
```
#Enhanced Axios Instance with Token Refresh and Retry

```
import axios from "axios";

// Create an Axios instance
const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false; // Flag to track token refresh state
let failedQueue: { resolve: (value?: any) => void; reject: (reason?: any) => void }[] = [];

// Function to process failed requests
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

// Request interceptor to add the Authorization header
apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling errors and token refresh
apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite loops
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshToken = localStorage.getItem("refreshToken"); // Assuming refresh token is stored
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/refresh-token`, {
                        refreshToken,
                    });

                    const newToken = response.data.token;
                    localStorage.setItem("token", newToken);

                    apiInstance.defaults.headers.Authorization = `Bearer ${newToken}`;

                    processQueue(null, newToken); // Resolve pending requests
                    isRefreshing = false;

                    return apiInstance(originalRequest); // Retry the original request
                } catch (err) {
                    processQueue(err, null); // Reject pending requests
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login"; // Redirect to login
                    throw err;
                }
            } else {
                // Queue failed requests while token is being refreshed
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }
        }

        return Promise.reject(error);
    }
);

// API call function
export const api = async (config: any) => {
    try {
        const response = await apiInstance({
            method: config.method,
            url: config.url,
            data: config.data,
            params: config.params,
            cancelToken: config.cancelToken,
            ...config,
        });
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return err.response.data;
        }
        throw err;
    }
};

export default apiInstance;
```