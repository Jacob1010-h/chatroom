import React from "react";
import "./MessageInput.css";

function MessageInput(props) {
    return (
        <div className="chat-message-input">
            <form onSubmit={props.onSubmit} autocomplete="off">
                <input
                    type="text"
                    name="message-input"
                    id="message-input"
                    placeholder="Type your message here..."
                    value={props.messageInput}
                    onChange={props.onChange}
                    data-lpignore="true"
                />
            </form>
        </div>
    );
}

export default MessageInput;
