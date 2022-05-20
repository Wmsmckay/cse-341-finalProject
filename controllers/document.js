const collection = 'documents';
const { response } = require('express');
const res = require('express/lib/response');
const DocumentsModel = require('../models/document');
const createError = require('http-errors');
const mongoose = require('mongoose');
//const { createDocumentSchema, updateDocumentSchema } = require('../helpers/validation_schema');

// #swagger.tags = ['Documents']

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Documents']

  try {
    const request = await DocumentsModel.find();
    res.json(request);
  } catch (err) {
    // res.json({
    //   message: err
    // });
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['Documents']

  try {
    const request = await DocumentsModel.findById(req.params.id);
    if (!request) {
      throw createError(404, "Document doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Document id'));
      return;
    }
    next(err);
  }
};

const getTitle = async (req, res, next) => {
  // #swagger.tags = ['Documents']

  try {
    const request = await DocumentsModel.find( {
      title: {
        $regex: req.params.title,
        $options: "i"} } );
    if (!request) {
      throw createError(404, "No titles found matching " + req.params.title);
    }
    res.json(request);
  } catch (err) {
      res.json({message: "Invalid request"});
    }
};

const create_document = async (req, res, next) => {
  // #swagger.tags = ['Documents']

  try {
    if (
      !req.body.title ||
      !req.body.docType ||
      !req.body.description ||
      !req.body.link ||
      !req.body.author
    ) {
      res.status(400).send({ message: 'Document fields cannot be empty.' });
      return;
    }
    const document = new DocumentsModel(req.body);
    document
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'An error occurred while creating the document entry.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const update_document = async (req, res, next) => {
  // #swagger.tags = ['Documents']

  try {
    const document = await DocumentModel.findById(req.params.id);

    if (!document) {
      throw createError(404, "Document doesn't exist");
    }

    const result = await updateDocumentSchema.validateAsync(req.body);

    if (req.body.documentName) {
      document.documentName = req.body.documentName;
    }
    if (req.body.participants) {
      document.participants = req.body.participants;
    }
    if (req.body.location) {
      document.location = req.body.location;
    }
    if (req.body.description) {
      document.description = req.body.description;
    }
    if (req.body.host) {
      document.host = req.body.host;
    }

    await document.save();
    res.send(document);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Document id'));
    }
    next(err);
  }
};

const delete_document = async (req, res, next) => {
  // #swagger.tags = ['Documents']

  try {
    const request = await DocumentModel.findByIdAndDelete({
      _id: req.params.id
    });
    if (!request) {
      throw createError(404, "Document doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Document id'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  getTitle,
  create_document,
  delete_document,
  update_document
};
