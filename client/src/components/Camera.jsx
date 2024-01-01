import React, { useState, useRef } from "react";

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  // Function to turn on the camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Function to turn off the camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <div
      className="camera-container"
      style={{
        marginLeft: "20px",
        marginTop: "30px",

        background: "rgba(255, 255, 255, 0.624)",
        backdropFilter: blur("5px"),
        borderRadius: "20px",
        height: "250px",
        width: "600px",

        border: "1px solid #ccc",
        padding: "10px",
        display: "flex",
        justifyContent: "space-around",

        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div>
        <video
          ref={videoRef}
          style={{ width: "350px", height: "230px" }}
          autoPlay
          playsInline
          muted
        ></video>
      </div>

      <div className="cameraControls">
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={stopCamera}>Stop Camera</button>
      </div>
    </div>
  );
};

export default CameraComponent;
