import React from "react";
import Username from "../../components/inputs/username/Username";
import ChatLog from "../../components/log/ChatLog";
import MessageInput from "../../components/inputs/message/MessageInput";

import "./Chat.css";

function Chat(props) {
    return (
        <div className="chat-container">
            <Username username={props.username} />
            <ChatLog chatLog={props.chatLog} username={props.username} />
            <MessageInput
                messageInput={props.messageInput}
                onChange={props.onChange}
                onSubmit={props.onSubmit}
            />
        </div>
    );
}

export default Chat;
