const mongoose = require('mongoose');
const VideoModel = require('../models/video');
const db = require('../models');

// Objects to be tested
const videoData = {
  title: 'Rick Astley - Never Gonna Give You Up',
  videoType: 'MP4',
  description: "Why don't you click on the link...",
  link: 'https://youtu.be/dQw4w9WgXcQ',
  releaseDate: 'Oct 25, 2009'
};

const videoWithInvalidField = new VideoModel({
  title: 'Rick Astley - Never Gonna Give You Up',
  invalidField: "I'm invalid :)",
  videoType: 'MP4',
  description: "Why don't you click on the link...",
  link: 'https://youtu.be/dQw4w9WgXcQ',
  releaseDate: 'Oct 25, 2009'
});

const videoWithoutRequiredField = new VideoModel({
  videoType: 'MP4',
  description: "Why don't you click on the link...",
  link: 'https://youtu.be/dQw4w9WgXcQ',
  releaseDate: 'Oct 25, 2009'
});

describe('Video Model Test', () => {
  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect
  beforeAll(async () => {
    await db.mongoose.connect(
      db.url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(async () => {
    await db.mongoose.connection.close();
  });

  // Test that video can be created successfully
  it('create & save video successfully', async () => {
    const validVideo = new VideoModel(videoData);
    const savedVideo = await validVideo.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedVideo._id).toBeDefined();
    expect(savedVideo.title).toBe(videoData.title);
    expect(savedVideo.videoType).toBe(videoData.videoType);
    expect(savedVideo.description).toBe(videoData.description);
    expect(savedVideo.link).toBe(videoData.link);
    expect(savedVideo.releaseDate).toBe(videoData.releaseDate);
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert video successfully, but the field does not defined in schema should be undefined', async () => {
    const savedVideoWithInvalidField = await videoWithInvalidField.save();
    expect(savedVideoWithInvalidField._id).toBeDefined();
    expect(savedVideoWithInvalidField.invalidField).toBeUndefined();
  });

  // Test Validation is working!!!
  // It should have told us the error is on videoType field.
  it('create video without required field should fail', async () => {
    let err;
    try {
      const savedVideoWithoutRequiredField = await videoWithoutRequiredField.save();
      error = savedVideoWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
  });
});
