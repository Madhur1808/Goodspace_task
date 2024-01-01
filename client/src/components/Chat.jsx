import React, { useState, useRef, useEffect } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
// import { fetchdata } from "../api.js";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newChat = [...chat, { text: message, sender: "user" }];
      setChat(newChat);
      setMessage("");

      setTimeout(() => {
        const aiResponse = { text: "This is AI response...", sender: "AI" };
        setChat([...newChat, aiResponse]);
      }, 500);
    }
    // fetchdata();
  };

  useEffect(() => {
    // Scroll chat container to the bottom on chat update
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Chat App
        </Typography>

        <div
          ref={chatContainerRef}
          style={{
            height: "300px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "10px",
            display: "flex",
            flexDirection: "column", // Reverses the order of messages
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // Internet Explorer and Edge
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar for Chrome and Safari
            },
          }}
        >
          {chat.map((chatItem, index) => (
            <div
              key={index}
              style={{
                textAlign: chatItem.sender === "user" ? "right" : "left",
              }}
            >
              <strong>{chatItem.sender}:</strong> {chatItem.text}
            </div>
          ))}
        </div>

        <Box mt={2} display="flex" alignItems="center">
          <TextField
            fullWidth
            label="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            style={{ marginLeft: "10px" }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
