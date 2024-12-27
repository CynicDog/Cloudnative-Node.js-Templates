import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

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
                setUserInfo(user.username);
                setIsAuthenticated(true);

                // Attach token in the Authorization header for the request
                fetch("/api/protected-remote-call", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${savedToken}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Response from protected remote call:", data);
                    })
                    .catch(error => {
                        console.error("Error during remote call:", error);
                    });

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
        userInfo
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
