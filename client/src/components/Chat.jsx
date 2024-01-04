import React, { useState, useRef, useEffect } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useSpeechSynthesis } from "react-speech-kit";
import axios from "axios";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [aimessage, setaimessage] = useState("");
  const chatContainerRef = useRef(null);
  const { speak } = useSpeechSynthesis();

  const username = localStorage.getItem("username");
  const setChatHandler = async () => {
    try {
      const response = await axios.post(
        "https://goodspace-task.onrender.com/setchat",
        {
          username,
          chat,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newChat = [...chat, { text: message, sender: "user" }];

      setChat(newChat);
      console.log(newChat);
      // setMess  age("");

      // const aimessage = "This is AI response";
      //

      try {
        const response = await axios.post(
          "https://goodspace-task.onrender.com/openaichat",
          {
            message,
          }
        );
        // console.log(response);
        const data = response.data.message;
        console.log(data);
        setaimessage(data);
        const aiResponse = { text: aimessage, sender: "AI" };
        setChat([...newChat, aiResponse]);
        speak({ text: aimessage });
        setMessage("");
      } catch (error) {
        console.log("control hererereree");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    setChatHandler();
  }, [chat]);

  return (
    <Container>
      <Box my={4}>
        <div
          className="chat-container"
          ref={chatContainerRef}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.624)",
            backdropFilter: blur("5px"),
            borderRadius: "20px",
            width: "600px",
            height: "200px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {chat.map((chatItem, index) => (
            <div
              key={index}
              style={{
                textAlign: chatItem.sender === "AI" ? "left" : "right",
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
            sx={{
              "& input": {
                backgroundColor: "white",
              },
              "& input:focus": {
                outline: "none",
              },
              "& .MuiInputLabel-root": {
                color: "grey",
              },
              "& .Mui-focused": {
                "& .MuiInputLabel-root": {
                  color: "grey",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{
              // padding: "0 20px 0 20px",
              marginLeft: "10px",
              fontSize: "20px",
              fontWeight: "700",
              color: "white",
              textTransform: "lowercase",

              "&:hover": {
                backgroundColor: "transparent",
              },
              "&:focus": {
                backgroundColor: "transparent",
              },
              fontFamily: "poppins",
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
