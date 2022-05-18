const collection = 'documents';
const { response } = require('express');
const res = require('express/lib/response');
const DocumentsModel = require('../models/documents');
const createError = require('http-errors');
const mongoose = require('mongoose');
const { createDocumentSchema, updateDocumentSchema } = require('../helpers/validation_schema');

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

const create_document = async (req, res, next) => {
  // #swagger.tags = ['Documents']

  try {
    const result = await createDocumentSchema.validateAsync(req.body);
    const document = new DocumentsModel(result);
    const request = await document.save();
    res.json(request);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(createError(422, err.message));
    }
    next(err);
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
  create_document,
  delete_document,
  update_document
};
