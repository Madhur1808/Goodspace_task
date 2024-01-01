import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Container, Box, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.length === 0 || password.length === 0) {
      return alert("Please fill all the details");
    }

    try {
      const response = await axios.post(
        "https://goodspace-task.onrender.com/login",
        {
          username,
          password,
        }
      );

      console.log(response);
      alert(`${response.data.message}`);
      navigate("/landing");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
