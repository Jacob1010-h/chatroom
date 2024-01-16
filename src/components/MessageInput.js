import React from "react";

function MessageInput(props) {
    return (
        <div className="chat-message-input">
            <input type="text" value={props.messageInput} />
        </div>
    );
}

export default MessageInput;
