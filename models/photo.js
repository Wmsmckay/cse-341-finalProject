const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  photoType: {
    type: String,
    enum: ['jpg', 'png', 'tiff', 'gif', 'bmp']
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  location: {
    longitude: String,
    latitude: String
  },
  dateTaken: {
    type: Date
  },
  photographer: {
    type: String
  }
});

module.exports = mongoose.model('Photos', photoSchema);
