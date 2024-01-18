import "./PageSelect.css";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import Chat from "../../pages/chat/Chat";
import { push, onValue, ref, off, onChildRemoved } from "firebase/database";

function PageSelect(props) {
    const [messageInput, setMessageInput] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [pageState, setPageState] = useState("Select");
    const [lastPageState, setLastPageState] = useState(null); // Add a new state variable for the last page state

    const onChange = (evt) => setMessageInput(evt.target.value);
    const onSubmit = (evt) => {
        evt.preventDefault();
        if (messageInput.length === 0) return;
        let payload = { message: messageInput, username: props.username };
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
    useEffect(fetchData, [pageState]);


    const handleButtonClick = (state) => {
        setLastPageState(pageState ? pageState : "Chat"); // If pageState is null, set lastPageState to "Chat"
        setPageState(state);
    };

    const selectorButton = (state) => {
        return (
            <div className="chat-page-select">
                <h2>Welcome to the {pageState} App</h2>
                <button onClick={() => handleButtonClick(state)}>Go to {lastPageState ? lastPageState : "Chat"}</button>
            </div>
        );
    };

    return (
        <div>
            {pageState === "Select" ? (
                selectorButton("Chat")
            ) : (
                <div>
                    {selectorButton("Select")}
                    <Chat
                        messageInput={messageInput}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        chatLog={chatLog}
                        username={props.username}
                    />
                </div>
            )}
        </div>
    );
}

export default PageSelect;
