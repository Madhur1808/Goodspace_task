import React from "react";
import Navbar from "../components/Navbar";

import Chat from "../components/Chat";
import Audio_to_text from "../components/audio_to_text";
const Landing = () => {
  return (
    <div>
      <div className="home-container">
        <Navbar />
        <div className="main">
          <Chat />
          <Audio_to_text />
        </div>
      </div>
    </div>
  );
};

export default Landing;
