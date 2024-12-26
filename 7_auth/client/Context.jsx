
// Auth Provider
import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("user_token");
        if (token) {
            // Save token in local storage or cookie
            localStorage.setItem("user_token", token);

            // Clear token from URL to keep it clean
            window.history.replaceState({}, document.title, "/");
            setIsAuthenticated(true);

            // Decode token to extract user info if needed
            const user = JSON.parse(atob(token.split('.')[1])); // Decodes JWT payload

            console.log(user);

            setUserInfo(user);
        }
    }, []);

    const value = {
        isAuthenticated,
        userInfo
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);