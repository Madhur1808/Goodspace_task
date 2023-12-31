const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();

app.listen(5000, () => {
  console.log("server started");
});
