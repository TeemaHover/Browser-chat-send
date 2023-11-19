// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to your backend server

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [username] = useState("User" + Math.floor(Math.random() * 1000)); // A random username for testing

  useEffect(() => {
    // Listener for 'chat' event
    const handleChat = (data) => {
      setChatHistory((prevHistory) => [...prevHistory, data]);
    };

    socket.on("chat", handleChat);

    return () => {
      // Clean up event listener when the component unmounts
      socket.off("chat", handleChat);
    };
  }, []);

  const sendMessage = () => {
    socket.emit("chat", { username, message });
    setMessage("");
  };

  return (
    <div>
      <div>
        {chatHistory.map((data, index) => (
          <div key={index}>
            <strong>{data.username}:</strong> {data.message}
          </div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;