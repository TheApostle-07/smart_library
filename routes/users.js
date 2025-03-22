// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with that email already exists' });
    }
    // For demonstration purposes, password is stored as plain text.
    // In production, hash the password using bcrypt or similar library.
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
  }
});

// POST /api/users/login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    // In production, generate a JWT token here.
    res.json({ success: true, message: 'Login successful', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
});

module.exports = router;