import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";

import Login from "../components/Login";
import Signup from "../components/Signup";

const Home = () => {
  const [loginState, setloginState] = useState(true);
  return (
    <div>
      <div className="home-container">
        <div className="navbar">
          <div className="logo-one">
            <img src="/client/public/Group.svg" />
          </div>
        </div>
        <div className="main">
          <div className="right">
            <div className="logo-two"></div>
            <h1>welcome to</h1>
            <h1>Goodspace communication</h1>
          </div>
          <div className="left">
            <div className="links">
              <Button
                onClick={() => {
                  setloginState(false);
                }}
              >
                Signup
              </Button>
              <span>/</span>
              <Button
                onClick={() => {
                  setloginState(true);
                }}
              >
                Login
              </Button>
            </div>

            {loginState ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
