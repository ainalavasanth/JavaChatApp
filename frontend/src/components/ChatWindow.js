import React from "react";

function ChatWindow({ messages, currentUser }) {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => {
        const isSelf = msg.user === currentUser;
        const isSystem = msg.user === "System";

        return (
          <div
            key={index}
            className={`message ${isSystem ? "system" : isSelf ? "self" : "other"}`}
          >
            {!isSystem && <strong>{msg.user}: </strong>}
            {msg.text}
          </div>
        );
      })}
    </div>
  );
}

export default ChatWindow;
