import React from "react";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import PageSelect from "./pages/home/PageSelect";
import { useState } from "react";

function App() {
    const [username, setUsername] = useState("John");
    const [appState, setAppState] = useState("login");

    const onLogin = function (username) {
        setUsername(username);
        setAppState("chat");
    };

    return (
        <div>
            {appState === "login" ? (
                <LoginPage onLogin={onLogin} />
            ) : (
                <PageSelect 
                    username={username}
                />
            )}
        </div>
    );
}

export default App;
