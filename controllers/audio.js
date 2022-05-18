const collection = 'audio';
const { response } = require('express');
const res = require('express/lib/response');
const AudioModel = require('../models/audio');
const createError = require('http-errors');
const mongoose = require('mongoose');
const { createAudioSchema, updateAudioSchema } = require('../helpers/validation_schema');

// #swagger.tags = ['Audio']

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Audio']

  try {
    const request = await AudioModel.find();
    res.json(request);
  } catch (err) {
    // res.json({
    //   message: err
    // });
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['Audio']

  try {
    const request = await AudioModel.findById(req.params.id);
    if (!request) {
      throw createError(404, "Audio doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Audio id'));
      return;
    }
    next(err);
  }
};

const create_audio = async (req, res, next) => {
  // #swagger.tags = ['Audio']

  try {
    const result = await createAudioSchema.validateAsync(req.body);
    const audio = new AudioModel(result);
    const request = await audio.save();
    res.json(request);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(createError(422, err.message));
    }
    next(err);
  }
};

const update_audio = async (req, res, next) => {
  // #swagger.tags = ['Audio']

  try {
    const audio = await AudioModel.findById(req.params.id);

    if (!audio) {
      throw createError(404, "Audio doesn't exist");
    }

    const result = await updateAudioSchema.validateAsync(req.body);

    if (req.body.audioName) {
      audio.audioName = req.body.audioName;
    }
    if (req.body.participants) {
      audio.participants = req.body.participants;
    }
    if (req.body.location) {
      audio.location = req.body.location;
    }
    if (req.body.description) {
      audio.description = req.body.description;
    }
    if (req.body.host) {
      audio.host = req.body.host;
    }

    await audio.save();
    res.send(audio);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Audio id'));
    }
    next(err);
  }
};

const delete_audio = async (req, res, next) => {
  // #swagger.tags = ['Audio']

  try {
    const request = await AudioModel.findByIdAndDelete({
      _id: req.params.id
    });
    if (!request) {
      throw createError(404, "Audio doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Audio id'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  create_audio,
  delete_audio,
  update_audio
};