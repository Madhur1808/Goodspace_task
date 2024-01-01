import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
      });

      console.log(response);
      alert(`${response.data.message} Please Login`);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(
  //   `Username: ${username}, Email: ${email}, Password: ${password}`
  // );
  // alert("User registered succesfully ");
  // Example: You might send a request to create a new user account

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
            margin="normal"
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
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
