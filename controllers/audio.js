const collection = 'audios';
const { response } = require('express');
const res = require('express/lib/response');
const db = require('../models');
const AudioModel = db.audio;
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
    const request = await AudioModel.find({
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

const create_audio = async (req, res, next) => {
  // #swagger.tags = ['Audio']
  /*  #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Create an audio file',
                  schema: { $ref: '#/definitions/Audio' }
          } */
  try {
    if (
      !req.body.title ||
      !req.body.audioType ||
      !req.body.description ||
      !req.body.link ||
      !req.body.contributors ||
      !req.body.releaseDate ||
      !req.body.lengthSeconds
    ) {
      res.status(400).send({
        message: 'Audio fields cannot be empty.'
      });
      return;
    }
    const audio = new AudioModel(req.body);
    audio
      .save()
      .then((data) => {
        // console.log(data);
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
  /*  #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Edit an audio file',
                  schema: { $ref: '#/definitions/Audio' }
          } */
  try {
    const audio = await AudioModel.findById(req.params.id);
    if (!audio) {
      throw createError(404, "Audio doesn't exist");
    }

    if (req.body.title) audio.title = req.body.title;
    if (req.body.audioType) audio.audioType = req.body.audioType;
    if (req.body.description) audio.description = req.body.description;
    if (req.body.link) audio.link = req.body.link;
    if (req.body.contributors.performers)
      audio.contributors.performers = req.body.contributors.performers;
    if (req.body.contributors.writers) audio.contributors.writers = req.body.contributors.writers;
    if (req.body.contributors.publishers)
      audio.contributors.publishers = req.body.contributors.publishers;
    if (req.body.releaseDate) audio.releaseDate = req.body.releaseDate;
    if (req.body.lengthSeconds) audio.lengthSeconds = req.body.lengthSeconds;

    audio.save((err) => {
      if (err) {
        res.status(500).json(err || 'An error occurred while updating the audio.');
      } else {
        res.status(204).send();
      }
    });
  } catch (err) {
    res.status(500).json(err);
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
