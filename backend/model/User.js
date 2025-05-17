const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["Admin", "Manager", "User", "Employee"], required: true },
  email: { type: String, unique: true, required: true },
  password: String,
  category: { type: String, enum: ["Designer", "Coder", "Tester"], required: false },
});

const User = mongoose.model("User", userSchema);
module.exports = User;