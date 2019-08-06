const mongoose = require('mongoose');

const User = new mongoose.Schema({
  date: {
    default: Date.now,
    type: Date
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  username: {
    required: true,
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('user', User);