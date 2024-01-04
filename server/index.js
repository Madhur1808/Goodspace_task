const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// const path = require("path");
// const bcrypt = require("bcrypt");
const cors = require("cors");
// const loginModel = require("./models/login");
const userModel = require("./models/user");
// const chat = require("./models/chat");

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

const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API });

app.post("/openaichat", async (req, res) => {
  const msg = req.body.message;
  try {
    console.log(msg);

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an tech interviewer." },
        { role: "user", content: msg },
      ],
      model: "gpt-3.5-turbo",
    });

    return res
      .status(200)
      .json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);

    // Check if the email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user (registration)
    const newUser = new userModel({ username, email, password });
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

    const existingUser = await userModel.findOne({ username });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found,Please register first" });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/setchat", async (req, res) => {
  const data = req.body;
  const username = data.username;
  const chats = data.chat;
  // console.log(username);
  // console.log(chats);
  try {
    const existingUser = await userModel.findOne({ username });
    if (!existingUser) res.send("User not found");
    // console.log(existingUser);

    if (existingUser.chats && existingUser.chats.length > 0) {
      existingUser.chats = chats;
    } else {
      existingUser.chats = [];
      chats.forEach((chat) => {
        existingUser.chats.push(chat);
      });
    }
    // existingUser.chats.push(chats);
    await existingUser.save();
    res.send("chat updated successfully");
  } catch (error) {
    console.log(error);
  }
});

app.get("/getchat/:username", async (req, res) => {
  // res.send("control reaches here");
  const username = req.params.username;

  try {
    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the chat messages for the user
    const chatMessages = existingUser.chats;

    return res.status(200).json({ username, chatMessages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("server started");
});
