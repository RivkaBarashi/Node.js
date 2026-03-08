const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
  type: String,
  unique: true,
  trim: true
},
  password: {
  type: String,
  minlength: 6
},
  role: {
    type: String,
    enum: ['admin', 'viewer'],
    default: 'viewer'
  }
});

module.exports = mongoose.model('User', userSchema);