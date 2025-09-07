const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require("passport");
const User = require('../models/User');


// Email/Password Signup
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

// Email/Password Login
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


// —————— Google OAuth Start ——————
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));

// —————— Google OAuth Callback ——————
router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate(
      'google',
      { session: false, failureRedirect: 'http://localhost:5173/login' },
      (err, user) => {
        if (err || !user) {
          console.error('Google auth failed:', err || 'No user');
          return res.redirect('http://localhost:5173/login');
        }

        // 1) Create JWT
        const token = jwt.sign(
          { id: user._id, email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        // 2) Send back HTML that posts the token and closes/redirects
        res.redirect(
          `http://localhost:5173/editor?token=${token}`
        );
      }
    )(req, res, next);
  }
);



module.exports = router;