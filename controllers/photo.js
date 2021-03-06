const collection = 'photo';
const { response } = require('express');
const res = require('express/lib/response');
const PhotoModel = require('../models/photo');
const createError = require('http-errors');
const mongoose = require('mongoose');


// #swagger.tags = ['Photos']

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Photos']

  try {
    const request = await PhotoModel.find();
    res.json(request);
  } catch (err) {
    // res.json({
    //   message: err
    // });
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['Photos']

  try {
    const request = await PhotoModel.findById(req.params.id);
    if (!request) {
      throw createError(404, "photo doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid photo id'));
      return;
    }
    next(err);
  }
};

const create_photo = async (req, res, next) => {
  // #swagger.tags = ['Photos']
  /*  #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Create a photo file',
                  schema: { $ref: '#/definitions/Photo' }
          } */
  try {
    if (
      !req.body.title ||
      !req.body.photoType ||
      !req.body.description ||
      !req.body.link ||
      !req.body.location ||
      !req.body.dateTaken ||
      !req.body.photographer
    ) {
      res.status(400).send({ message: 'photo fields cannot be empty.' });
      return;
    }
    const photo = new PhotoModel(req.body);
    photo
      .save()
      .then((data) => {
        // console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'An error occurred while creating the photo entry.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const update_photo = async (req, res, next) => {
  // #swagger.tags = ['Photos']
  /*  #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Edit an photo file',
                  schema: { $ref: '#/definitions/Photo' }
          } */
  try {
    const photo = await PhotoModel.findById(req.params.id);

    if (!photo) {
      throw createError(404, "photo doesn't exist");
    }

    if (req.body.title) photo.title = req.body.title;
    if (req.body.photoType) photo.photoType = req.body.photoType;
    if (req.body.description) photo.description = req.body.description;
    if (req.body.link) photo.link = req.body.link;
    if (req.body.location.longitude)
      photo.location.longitude = req.body.location.longitude;
    if (req.body.location.latitude)
      photo.location.latitude = req.body.location.latitude;
    if (req.body.releaseDate) photo.releaseDate = req.body.releaseDate;
    if (req.body.lengthSeconds) photo.lengthSeconds = req.body.lengthSeconds;

    photo.save((err) => {
      if (err) {
        res.status(500).json(err || 'An error occurred while updating the photo.');
      } else {
        res.status(204).send();
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const delete_photo = async (req, res, next) => {
  // #swagger.tags = ['Photos']

  try {
    const request = await PhotoModel.findByIdAndDelete({
      _id: req.params.id
    });
    if (!request) {
      throw createError(404, "photo doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid photo id'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  create_photo,
  delete_photo,
  update_photo
};
