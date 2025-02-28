const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      // Password is required only if googleId is not provided
      return !this.googleId;
    }
  },
  googleId: { type: String },
  name: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
