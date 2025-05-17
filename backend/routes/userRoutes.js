const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/User.js");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, type, email, password, category } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ name, type, email, password: hashedPassword, category });
    await user.save();

    res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed!", error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials!" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

    res.json({ message: "Login successful!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed!", error });
  }
});

module.exports = router;