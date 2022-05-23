const mongoose = require('mongoose');
const DocumentModel = require('../models/document');
const db = require('../models');

// Objects to be tested
const documentData = {
  title: 'My special document',
  docType: 'PDF',
  description: 'A special PDF that I keep for myself.',
  link: 'https://youtu.be/dQw4w9WgXcQ',
  author: ['Gabe Itches']
};

const documentWithInvalidField = new DocumentModel({
  title: 'My special document',
  invalidField: "I'm invalid :)",
  docType: 'PDF',
  description: 'A special PDF that I keep for myself.',
  link: 'https://youtu.be/dQw4w9WgXcQ',
  author: ['Gabe Itches']
});

const documentWithoutRequiredField = new DocumentModel({
  docType: 'PDF',
  description: 'A special PDF that I keep for myself.',
  link: 'https://youtu.be/dQw4w9WgXcQ',
  author: ['Gabe Itches']
});

describe('Document Model Test', () => {
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

  // Test that document can be created successfully
  it('create & save document successfully', async () => {
    const validDocument = new DocumentModel(documentData);
    const savedDocument = await validDocument.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedDocument._id).toBeDefined();
    expect(savedDocument.title).toBe(documentData.title);
    expect(savedDocument.docType).toBe(documentData.docType);
    expect(savedDocument.description).toBe(documentData.description);
    expect(savedDocument.link).toBe(documentData.link);
    expect(savedDocument.author.sort()).toStrictEqual(documentData.author.sort());
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert document successfully, but the field does not defined in schema should be undefined', async () => {
    const savedDocumentWithInvalidField = await documentWithInvalidField.save();
    expect(savedDocumentWithInvalidField._id).toBeDefined();
    expect(savedDocumentWithInvalidField.invalidField).toBeUndefined();
  });

  // Test Validation is working!!!
  // It should have told us the error is on documentType field.
  it('create document without required field should failed', async () => {
    let err;
    try {
      const savedDocumentWithoutRequiredField = await documentWithoutRequiredField.save();
      error = savedDocumentWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
  });
});
