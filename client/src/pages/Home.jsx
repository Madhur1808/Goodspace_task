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
            <img src="/Group.svg" />
            <span className="goodspace">goodspace</span>
          </div>
        </div>
        <div className="main">
          <div className="right">
            <div className="logo-two">
              <img src="/Group.svg" />
            </div>
            <h1 className="headline">welcome to</h1>
            <h1 className="headline">Goodspace communication</h1>
          </div>
          <div className="left">
            <div className="links">
              <Button
                onClick={() => {
                  setloginState(false);
                }}
                sx={{
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
                Signup
              </Button>
              <span className="slash">/</span>
              <Button
                onClick={() => {
                  setloginState(true);
                }}
                sx={{
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
