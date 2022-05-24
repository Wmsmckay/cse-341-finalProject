const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  audioType: { 
    type: String,
    enum: ['mp3', 'wav', 'wma','ogg', 'aac', 'flac','alac','aiff','pcm',]
  },
  description: { type: String },
  link: { type: String },
  contributors: { performers: [String], writers: [String], publishers: [String] },
  releaseDate: { type: Date },
  lengthSeconds: { type: Number, min: 0 }
});

module.exports = mongoose.model('Audios', audioSchema);
