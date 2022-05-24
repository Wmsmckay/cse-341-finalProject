const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  displayName: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  image: { type: String },
  email: { type: String },
  password: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', userSchema);
