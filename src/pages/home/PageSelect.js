import "./PageSelect.css";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import Chat from "../../pages/chat/Chat";
import { push, onValue, ref, off, onChildRemoved } from "firebase/database";

function PageSelect(props) {
    const [messageInput, setMessageInput] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [pageState, setPageState] = useState("Select");
    const [lastPageState, setLastPageState] = useState(null);

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
        setLastPageState(pageState ? pageState : "Chat");
        setPageState(state);
    };

    const renderSelectPage = () => {
        return (
            <div className=" mb-20 text-md shadow-md p-20 w-full h-screen justify-center flex flex-col items-center ">
                <h2>Welcome to the {pageState} App</h2>
                {selectorButton("Chat")}
                {selectorButton("Links")}
            </div>
        );
    };

    const renderChat = () => {
        return (
            <div>
                <div className="mb-20 text-md bg-[#162d3f] shadow-lg p-3 w-full flex flex-col items-start">
                    {selectorButton("Select")}
                </div>
                <div>
                    <Chat
                        messageInput={messageInput}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        chatLog={chatLog}
                        username={props.username}
                        links={false}
                    />
                </div>
            </div>
        );
    };

    const selectorButton = (state) => {
        return (
            <button
                className="page-select-button"
                onClick={() => handleButtonClick(state)}
            >
                Go to {state}
            </button>
        );
    };

    const renderLinks = () => {
        return (
            <div>
                <div className="mb-20 text-md bg-[#162d3f] shadow-lg p-3 w-full flex flex-col items-start">
                    {selectorButton("Select")}
                </div>
                <div>
                    <Chat
                        messageInput={messageInput}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        chatLog={chatLog}
                        username={props.username}
                        links={true}
                    />
                </div>
            </div>
        );
    };

    const render404 = () => {
        return (
            <div>
                <div className="mb-20 text-md bg-[#162d3f] shadow-lg p-3 w-full flex flex-col items-start">
                    {selectorButton("Select")}
                </div>
                <div className="text-md shadow-md p-20 w-full h-screen justify-center flex flex-col items-center ">
                    <h2>404: Page Not Found</h2>
                </div>
            </div>
        );
    };

    return (
        <span>
            {pageState === "Select" ? (
                <div className=" overflow-hidden h-screen">{renderSelectPage()}</div>
            ) : pageState === "Chat" ? (
                <div className=" overflow-auto ">{renderChat()}</div>
            ) : pageState === "Links" ? (
                <div>{renderLinks()}</div>
            ) : (
                <div>{render404}</div>
            )}
        </span>
    );
}

export default PageSelect;
