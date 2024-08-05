import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});

   
    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
          setAuth(JSON.parse(storedAuth));    
        }
      }, []);
    
      useEffect(() => {
        if (Object.keys(auth).length > 0) {
          localStorage.setItem('auth', JSON.stringify(auth));
        } else {
          localStorage.removeItem('auth');
        }
      }, [auth]);
      
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
