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

