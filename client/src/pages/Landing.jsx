import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CameraComponent from "../components/Camera";

import Chat from "../components/Chat";
import Audio_to_text from "../components/Audio_to_text";
import axios from "axios";
const Landing = () => {
  const [chatMessages, setchatMessages] = useState();
  useEffect(() => {
    const username = localStorage.getItem("username");

    const getChatHandler = async () => {
      try {
        const response = await axios.get(
          `https://goodspace-task.onrender.com/getchat/${username}`
        );
        console.log(response);
        setchatMessages(response.data.chatMessages);
      } catch (error) {
        console.error(error);
      }
    };

    getChatHandler();
  }, []);

  return (
    <div>
      <div className="home-container">
        <Navbar />
        <div className="main">
          <div className="left-landing">
            <CameraComponent />
            <Chat chatMessages={chatMessages} />
          </div>
          <Audio_to_text />
        </div>
      </div>
    </div>
  );
};

export default Landing;
