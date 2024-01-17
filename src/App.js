import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import { db } from "./firebaseConfig";
import { push, onValue, ref, off, onChildRemoved } from "firebase/database";
import LoginPage from "./components/LoginPage";

function App() {
    const [username, setUsername] = useState("John");
    const [messageInput, setMessageInput] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [appState, setAppState] = useState("login");

    const onChange = (evt) => setMessageInput(evt.target.value);
    const onSubmit = (evt) => {
        evt.preventDefault();
        if (messageInput.length === 0) return;
        let payload = { message: messageInput, username: username };
        push(ref(db), payload);
        setMessageInput("");
    };

    const fetchData = () => {
        const dbRef = ref(db, "/");

        const handleSnapshot = (snapshot) => {
            if (snapshot.exists()) {
                let items = snapshot.val();
                console.log(items);
                if (items && typeof items === "object") {
                    items = Object.values(items);
                } else {
                    items = [];
                }
                setChatLog(items);
            }
        };

        const listener = onValue(dbRef, handleSnapshot, console.error);
        const removalListener = onChildRemoved(dbRef, handleSnapshot);

        return () => {
            off(dbRef, listener);
            off(dbRef, removalListener);
        };
    };
    useEffect(fetchData, []);

    const onLogin = function (username) {
        setUsername(username);
        setAppState("chat");
    };

    return (
        <div>
            {appState === "login" ? (
                <LoginPage onLogin={onLogin} />
            ) : (
                <Chat
                    username={username}
                    chatLog={chatLog}
                    messageInput={messageInput}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
}

export default App;
