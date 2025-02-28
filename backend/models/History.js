const mongoose = require('mongoose');

const ChatHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', ChatHistorySchema);
