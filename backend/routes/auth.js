const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const User = require('../models/User');
const passport = require("passport");

// Initiate Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    res.status(201).json({ success: true, message: 'User created' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

// Google OAuth Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("/login");
      }
      // Generate a JWT token for the authenticated user
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      // Redirect to the frontend with the token as a query parameter
      res.redirect(`http://localhost:5173/editor?token=${token}`);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect("/login");
    }
  }
);

module.exports = router;
