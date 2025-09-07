// backend/routes/chatHistory.js
const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/History');
const jwt = require('jsonwebtoken');
const {authMiddleware} = require('../Middleware/authMiddleware');

// GET all chat histories for the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const histories = await ChatHistory.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, histories });
  } catch (err) {
    console.error("Error fetching chat histories:", err);
    res.status(500).json({ success: false, message: "Error fetching histories" });
  }
});

// GET a single chat history by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const history = await ChatHistory.findOne({ _id: req.params.id, user: req.userId });
    if (!history) {
      return res.status(404).json({ success: false, message: 'History not found' });
    }
    res.json({ success: true, history });
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ success: false, message: "Error fetching history" });
  }
});

// POST endpoint to save a chat history (for reference)
router.post('/', authMiddleware, async (req, res) => {
  const { code, review } = req.body;
  try {
    const chatHistory = new ChatHistory({
      user: req.userId,
      code,
      review,
    });
    await chatHistory.save();
    res.status(201).json({ success: true, message: 'Chat saved successfully' });
  } catch (err) {
    console.error("Error saving chat:", err);
    res.status(500).json({ success: false, message: 'Error saving chat' });
  }
});

module.exports = router;
