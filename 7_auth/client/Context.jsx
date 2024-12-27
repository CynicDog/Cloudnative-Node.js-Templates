import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // Check for token in URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get("user_token");

        if (token) {
            // Save token in local storage
            localStorage.setItem("user_token", token);

            // Clear token from URL to keep it clean
            window.history.replaceState({}, document.title, "/");
        }

        // Retrieve token from local storage
        const savedToken = localStorage.getItem("user_token");
        if (savedToken) {
            try {
                // Decode token to extract user info if needed
                const user = JSON.parse(atob(savedToken.split('.')[1]));
                setUsername(user.username);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Failed to parse token:", error);
                // Remove invalid token
                localStorage.removeItem("user_token");
                setIsAuthenticated(false);
            }
        }
    }, []);

    const value = {
        isAuthenticated,
        username
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
