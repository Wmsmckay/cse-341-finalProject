const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoType: { type: String, enum:['3g2','3gp','asf','avi','flv','m4v','mov','mp4','mpg','rm','srt','swf','vob','wmv']},
  description: { type: String },
  link: { type: String },
  releaseDate: { type: Date },
  lengthSeconds: { type: Number, min: 1 }
});

module.exports = mongoose.model('Videos', videoSchema);
