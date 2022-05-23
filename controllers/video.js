const collection = 'video';
const { response } = require('express');
const res = require('express/lib/response');
const VideoModel = require('../models/video');
const createError = require('http-errors');
const mongoose = require('mongoose');
//const { createVideoSchema, updateVideoSchema } = require('../helpers/validation_schema');

// #swagger.tags = ['Video']

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Video']

  try {
    const request = await VideoModel.find();
    res.json(request);
  } catch (err) {
    // res.json({
    //   message: err
    // });
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['Video']

  try {
    const request = await VideoModel.findById(req.params.id);
    if (!request) {
      throw createError(404, "Video doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Video id'));
      return;
    }
    next(err);
  }
};

const getTitle = async (req, res, next) => {
  // #swagger.tags = ['Video']

  try {
    const request = await VideoModel.find({
      title: {
        $regex: req.params.title,
        $options: 'i'
      }
    });
    if (!request) {
      throw createError(404, 'No titles found matching ' + req.params.title);
    }
    res.json(request);
  } catch (err) {
    res.json({ message: 'Invalid request' });
  }
};

const create_video = async (req, res, next) => {
  // #swagger.tags = ['Video']

  try {
    if (
      !req.body.title ||
      !req.body.videoType ||
      !req.body.description ||
      !req.body.link ||
      !req.body.releaseDate
    ) {
      res.status(400).send({ message: 'Content cannot be empty.' });
      return;
    }
    const video = new VideoModel(req.body);
    video
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'An error occurred while creating the video entry.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const update_video = async (req, res, next) => {
  // #swagger.tags = ['Video']

  try {
    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      throw createError(404, "Video doesn't exist");
    }

    const result = await updateVideoSchema.validateAsync(req.body);

    if (req.body.title) {
      video.title = req.body.title;
    }
    if (req.body.videoType) {
      video.videoType = req.body.videoType;
    }
    if (req.body.description) {
      video.description = req.body.description;
    }
    if (req.body.link) {
      video.link = req.body.link;
    }
    if (req.body.releaseDate) {
      video.releaseDate = req.body.releaseDate;
    }

    await video.save();
    res.send(video);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Video id'));
    }
    next(err);
  }
};

const delete_video = async (req, res, next) => {
  // #swagger.tags = ['Video']

  try {
    const request = await VideoModel.findByIdAndDelete({
      _id: req.params.id
    });
    if (!request) {
      throw createError(404, "Video doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Video id'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  getTitle,
  create_video,
  delete_video,
  update_video
};
