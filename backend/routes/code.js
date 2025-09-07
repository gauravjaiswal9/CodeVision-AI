const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const runGemini = require('./geminiapi');
const ChatHistory = require('../models/History');
const {authMiddleware} = require('../Middleware/authMiddleware');


// (Assuming you have authMiddleware to get req.userId)


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
