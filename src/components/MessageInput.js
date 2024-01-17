import React from "react";

function MessageInput(props) {
    return (
        <div className="chat-message-input">
            <form onSubmit={props.onSubmit}>
                <input
                    type="text"
                    name="message-input"
                    id="message-input"
                    placeholder="Type your message here..."
                    value={props.messageInput}
                    onChange={props.onChange}
                />
            </form>
        </div>
    );
}

export default MessageInput;
