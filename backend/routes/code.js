const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const runGemini = require('./geminiapi');
const ChatHistory = require('../models/History');

// (Assuming you have authMiddleware to get req.userId)
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

router.post('/review', authMiddleware, async (req, res) => {
  const { code } = req.body;
  try {
    const review = await runGemini(code);
    // Save chat history
    // const chatHistory = new ChatHistory({
    //   user: req.userId,
    //   code,
    //   review,
    // });
    // await chatHistory.save();
    res.json({ success: true, review });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error processing code' });
  }
});

module.exports = router;
