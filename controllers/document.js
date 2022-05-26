const collection = 'documents';
const { response } = require('express');
const res = require('express/lib/response');
const db = require('../models');
const DocumentsModel = db.document;
const createError = require('http-errors');
const mongoose = require('mongoose');
// const { createDocumentSchema, updateDocumentSchema } = require('../helpers/validation_schema');

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
    const request = await DocumentsModel.find({
      title: {
        $regex: req.params.title,
        $options: 'i'
      }
    });
    if (request.length === 0) {
      throw createError(404, 'No titles found matching ' + req.params.title);
    }
    res.json(request);
  } catch (err) {
    res.json({
      message: 'Invalid request'
    });
  }
};

const create_document = async (req, res, next) => {
  // #swagger.tags = ['Documents']
  /*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: 'Create document entry',
                    schema: { $ref: '#/definitions/Document' }
            } */
  try {
    if (
      !req.body.title ||
      !req.body.docType ||
      !req.body.description ||
      !req.body.link ||
      !req.body.author
    ) {
      res.status(400).send({
        message: 'Document fields cannot be empty.'
      });
      return;
    }
    const document = new DocumentsModel(req.body);
    document
      .save()
      .then((data) => {
        // console.log(data);
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
  /*  #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Update a document',
                  schema: { $ref: '#/definitions/Document' }
          } */
  try {
    const document = await DocumentsModel.findById(req.params.id);

    if (!document) {
      throw createError(404, "Document doesn't exist");
    }

    if (req.body.title) document.title = req.body.title;
    if (req.body.docType) document.docType = req.body.docType;
    if (req.body.description) document.description = req.body.description;
    if (req.body.link) document.link = req.body.link;
    if (req.body.author) document.author = req.body.author;

    document.save((err) => {
      if (err) {
        res.status(500).json(err || 'An error occurred while updating the document.');
      } else {
        res.status(204).send();
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const delete_document = async (req, res, next) => {
  // #swagger.tags = ['Documents']

  try {
    const request = await DocumentsModel.findByIdAndDelete({
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
