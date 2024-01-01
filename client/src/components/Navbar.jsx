import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    navigate("/");
  };
  return (
    <div className="navbar navbar-logout">
      <div className="logo-one">
        <img src="/Group.svg" />
        <span className="goodspace">goodspace</span>
      </div>
      <Button
        onClick={logoutHandler}
        sx={{
          marginRight: "20px",
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
        LOGOUT
      </Button>
    </div>
  );
};

export default Navbar;
