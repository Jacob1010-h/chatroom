import React, { useState } from "react";
import "./App.css";
import Username from "./components/Username";
import ChatLog from "./components/ChatLog";
import MessageInput from "./components/MessageInput";

function App() {
    const [username, setUsername] = useState("Test user");
    const [messageInput, setMessageInput] = useState("Enter Message");
    const [chatLog, setChatLog] = useState([]);

    return (
        <div className="chat-container">
            <Username username={username} />
            <ChatLog chatLog={chatLog} />
            <MessageInput messageInput={messageInput} />
        </div>
    );
}

export default App;
