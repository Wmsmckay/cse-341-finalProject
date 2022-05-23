const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  audioType: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  contributors: {
    performers: [String],
    writers: [String],
    publishers: [String]
  },
  releaseDate: {
    type: String
  },
  length: {
    type: String
  }
});

module.exports = mongoose.model('Audios', audioSchema);