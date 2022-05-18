const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoType: { type: String },
  description: { type: String },
  link: { type: String },
  releaseDate: { type: String }
});

module.exports = mongoose.model('videos', videoSchema);
