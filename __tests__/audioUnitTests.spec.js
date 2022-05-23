const mongoose = require('mongoose');
const AudioModel = require('../models/audio');
const db = require('../models');

// Objects to be tested
const audioData = {
    title: 'Sibbie',
    audioType: 'mp4',
    description: 'A song about Sibbie',
    link: 'https://www.test.com/1234',
    contributors: {
        performers: [
            'Strong Bad'
        ],
        writers: [
            'The Brothers Chaps'
        ],
        publishers: [
            'The Brothers Chaps'
        ]
    },
    releaseDate: 'June 9, 2003',
    length: '0:33'
};

const audioWithInvalidField = new AudioModel({
    title: 'Sibbie',
    invalidField: "I'm invalid :)",
    audioType: 'mp4',
    description: 'A song about Sibbie',
    link: 'https://www.test.com/1234',
    contributors: {
        performers: [
            'Strong Bad'
        ],
        writers: [
            'The Brothers Chaps'
        ],
        publishers: [
            'The Brothers Chaps'
        ]
    },
    releaseDate: 'June 9, 2003',
    length: '0:33'
});

const audioWithoutRequiredField = new AudioModel({
    title: 'Sibbie',
    description: 'A song about Sibbie',
    link: 'https://www.test.com/1234',
    contributors: {
        performers: [
            'Strong Bad'
        ],
        writers: [
            'The Brothers Chaps'
        ],
        publishers: [
            'The Brothers Chaps'
        ]
    },
    releaseDate: 'June 9, 2003',
    length: '0:33'
});

describe('Audio Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await db.mongoose
            .connect(db.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            });
    });

    // Test that audio can be created successfully
    it('create & save audio successfully', async () => {
        const validAudio = new AudioModel(audioData);
        const savedAudio = await validAudio.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedAudio._id).toBeDefined();
        expect(savedAudio.title).toBe(audioData.title);
        expect(savedAudio.audioType).toBe(audioData.audioType);
        expect(savedAudio.description).toBe(audioData.description);
        expect(savedAudio.link).toBe(audioData.link);
        // expect(savedAudio.contributors.performers).toBe(audioData.contributors.performers);
        expect(savedAudio.releaseDate).toBe(audioData.releaseDate);
        expect(savedAudio.length).toBe(audioData.length);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const savedAudioWithInvalidField = await audioWithInvalidField.save();
        expect(savedAudioWithInvalidField._id).toBeDefined();
        expect(savedAudioWithInvalidField.invalidField).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should have told us the error is on gender field.
    it('create user without required field should failed', async () => {
        let err;
        try {
            const savedAudioWithoutRequiredField = await audioWithoutRequiredField.save();
            error = savedAudioWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.audioType).toBeDefined();
    });


})