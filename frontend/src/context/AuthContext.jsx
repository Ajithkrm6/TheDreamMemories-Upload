import React,{createContext,useContext,useState} from 'react';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(false)
    const [isAuthenticated,setIsAuthenticated] = useState(false)

    const login =()=> setIsAuthenticated(true)
    const logout =()=> setIsAuthenticated(false)
    return(
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)