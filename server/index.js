const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors");
// const loginModel = require("./models/login");
const registerModel = require("./models/register");

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);

    // Check if the email already exists in the database
    const existingUser = await registerModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user (registration)
    const newUser = new registerModel({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  // console.log("control reaches here");
  try {
    const { username, password } = req.body;
    // console.log(req.body, "hgfhkhljk");

    // Check if the email exists in the database
    const existingUser = await registerModel.findOne({ username });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found,Please register first" });
    }

    // Check if the password matches
    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("server started");
});
