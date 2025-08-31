import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const name = prompt("Enter your username:");
    setUsername(name || "Guest");
    socket.emit("join", name || "Guest");
  }, []);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("chatMessage");
  }, []);

  const handleSend = (text) => {
    if (text.trim()) {
      socket.emit("chatMessage", text);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">💬 Chat App</h2>
      <ChatWindow messages={messages} currentUser={username} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}

export default App;
