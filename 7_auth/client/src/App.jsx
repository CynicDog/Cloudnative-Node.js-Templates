import './App.css'
import {useAuth} from "../Context.jsx";

function App() {

    const { isAuthenticated, userInfo } = useAuth();

    return (
        <>
            { isAuthenticated ? (
                <>
                    <span>Authenticated! Hello, {userInfo} 👋</span>
                </>
            ):(
                <>
                    <h2>OAuth2</h2>
                    <div>
                        <button
                            onClick={() => { window.location.href = "/api/sign-in"; }}
                            style={{margin: "5px"}}>
                            GitHub
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default App
