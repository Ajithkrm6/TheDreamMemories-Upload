import React,{createContext,useState} from React;

const AuthContext = createContext()

AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(false)
    return(
        <AuthContext.Provider value={{user,loading}}>
            {children}
        </AuthContext.Provider>
    )
}