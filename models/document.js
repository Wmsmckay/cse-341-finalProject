const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  title: { type: String, required: true },
  docType: { type: String },
  description: { type: String },
  link: { type: String },
  author: { type: String }
});

module.exports = mongoose.model('Documents', docSchema);
