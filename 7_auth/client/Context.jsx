
// Auth Provider
import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('access_token='))?.split('=')[1];

        if (token) setIsAuthenticated(true);
    }, []);


    const value = {
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);