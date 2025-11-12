import {} from "react";
import razorfishLogo from "/pwa-512x512.png";
import "./App.css";

function App() {
    return (
        <>
            <div>
                <a href="https://razorfish.com" target="_blank">
                    <img src={razorfishLogo} className="logo" alt="Vite logo" />
                </a>
            </div>
            <h1>PWA POC</h1>
            <p className="read-the-docs">click on the download icon on desktop in the browser url</p>
        </>
    );
}

export default App;
