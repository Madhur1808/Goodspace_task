const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  chats: [
    {
      text: String,
      sender: String,
    },
  ],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
