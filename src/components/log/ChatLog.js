import React from "react";
import DOMPurify from "dompurify";
import "./ChatLog.css";

function ChatLog(props) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return (
        <div className="chat-log">
            {[...props.chatLog].reverse().map((chat, idx) => {
                const links = chat.message.match(urlRegex);
                if (props.links && !links) {
                    return null; // Skip this message if it doesn't contain links
                }
                if (!props.links && links) {
                    return null; // Skip this message if it contains links
                }

                // Sanitize the message
                const sanitizedMessage = DOMPurify.sanitize(chat.message);

                if (props.username === chat.username) {
                    return (
                        <div
                            className="chat-item chat-from-me bg-slate-200"
                            key={"chat" + idx}
                        >
                            <span className="inline-block bg-slate-500 border border-white rounded-full px-3 py-1 text-sm font-semibold text-white mb-2">{chat.username}</span>
                            <div className="message-box">
                                <h4 dangerouslySetInnerHTML={{__html: sanitizedMessage}}></h4>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="chat-item bg-gray-200"
                            key={"chat" + idx}
                        >
                            <span className="inline-block bg-white border border-slate-500 rounded-full px-3 py-1 text-sm font-semibold text-slate-500 mb-2">{chat.username}</span>
                            <div className="message-box">
                                <h4 dangerouslySetInnerHTML={{__html: sanitizedMessage}}></h4>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default ChatLog;