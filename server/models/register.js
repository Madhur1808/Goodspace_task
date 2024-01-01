const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const registerModel = mongoose.model("register", registerSchema);

module.exports = registerModel;
