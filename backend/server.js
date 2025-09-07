const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

// Initialize express app
const app = express();

// Passport configuration
const passport = require("passport");
require("./routes/passport"); 

// Middlewares
app.use(passport.initialize());
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ai_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Routes
const authRoutes = require('./routes/auth');
const codeRoutes = require('./routes/code');
const chatHistoryRoutes = require('./routes/ChatHistory');

app.use('/api/auth', authRoutes);
app.use('/api/code', codeRoutes);
app.use('/api/chat-history', chatHistoryRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
