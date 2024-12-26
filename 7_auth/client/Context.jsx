
// Auth Provider
import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Read the 'is_authenticated' cookie
        const isAuthenticatedCookie = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('is_authenticated='))
            ?.split('=')[1];

        if (isAuthenticatedCookie === 'true') {
            setIsAuthenticated(true);
        }
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