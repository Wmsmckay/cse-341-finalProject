const collection = 'audios';
const { response } = require('express');
const res = require('express/lib/response');
const AudioModel = require('../models/audio');
const createError = require('http-errors');
const mongoose = require('mongoose');
//const { createAudioSchema, updateAudioSchema } = require('../helpers/validation_schema');

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

const getTitle = async (req, res, next) => {
  // #swagger.tags = ['Audio']

  try {
    const request = await AudioModel.find( {
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

const create_audio = async (req, res, next) => {
  // #swagger.tags = ['Audio']
  try {
    if (
      !req.body.title ||
      !req.body.audioType ||
      !req.body.description ||
      !req.body.link ||
      !req.body.credit ||
      !req.body.releaseDate ||
      !req.body.length
    ) {
      res.status(400).send({ message: 'Audio fields cannot be empty.' });
      return;
    }
    const audio = new AudioModel(req.body);
    audio
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'An error occurred while creating the audio entry.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
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
  getTitle,
  create_audio,
  delete_audio,
  update_audio
};
