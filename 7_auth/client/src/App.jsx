import './App.css';
import { useAuth } from "../Context.jsx";
import { useEffect, useState } from "react";

function App() {
    const { isAuthenticated, userInfo } = useAuth();
    const [repositories, setRepositories] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            const savedToken = localStorage.getItem("user_token");

            if (savedToken) {
                fetch("/api/github/repositories", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${savedToken}`,
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Protected remote call response:", data);
                        setRepositories(data.repositories || []);
                    })
                    .catch((error) => {
                        console.error("Error during protected remote call:", error);
                    });
            }
        }
    }, [isAuthenticated]);

    return (
        <>
            {isAuthenticated ? (
                <>
                    <h2>Authenticated! Hello, {userInfo.username} 👋</h2>
                    {repositories && repositories.length > 0 ? (
                        <div style={{ paddingTop: "25px", textAlign: "left" }}>
                            <h4>Repositories ({repositories.length})</h4>
                            {repositories.map((repo) => (
                                <div key={repo.id} style={{ marginBottom: "8px" }}>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No repositories found.</p>
                    )}
                </>
            ) : (
                <>
                    <h2>OAuth2</h2>
                    <div>
                        <button
                            onClick={() => {
                                window.location.href = "/api/sign-in";
                            }}
                            style={{ margin: "5px" }}
                        >
                            GitHub
                        </button>
                    </div>
                </>
            )}
            <div className="read-the-docs" style={{ paddingTop: "100px" }}>
                <a
                    href="https://github.com/CynicDog/Cloudnative-Node.js-Templates/tree/master/7_auth"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub Repo
                </a>
            </div>
        </>
    );
}

export default App;
