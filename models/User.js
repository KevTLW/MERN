const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true
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
  date: {
    default: Date.now,
    type: Date
  },
});

module.exports = mongoose.model('user', User);