import './App.css'
import { useAuth } from "../Context.jsx";
import {useEffect, useState} from "react";

function App() {

    const { isAuthenticated, userInfo } = useAuth();
    const [ remoteResource, setRemoteResource ] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            const savedToken = localStorage.getItem("user_token");

            if (savedToken) {
                fetch("/api/protected-remote-call", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${savedToken}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Protected remote call response:", data);
                        setRemoteResource(data.resource);
                    })
                    .catch(error => {
                        console.error("Error during protected remote call:", error);
                    });
            }
        }
    }, [isAuthenticated]);

    return (
        <>
            {isAuthenticated ? (
                <>
                    <h2>Authenticated! Hello, {userInfo} 👋</h2>
                    {remoteResource && (
                        <div style={{ paddingTop: "25px" }}>
                            Here's the resource fetched from the remote server: <br/> {remoteResource}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h2>OAuth2</h2>
                    <div>
                        <button
                            onClick={() => { window.location.href = "/api/sign-in"; }}
                            style={{ margin: "5px" }}>
                            GitHub
                        </button>
                    </div>
                </>
            )}
            <div className="read-the-docs" style={{ paddingTop: "100px" }}>
                <a href="https://github.com/CynicDog/Cloudnative-Node.js-Templates/tree/master/7_auth" target="_blank">GitHub Repo</a>
            </div>
        </>
    );
}

export default App;
