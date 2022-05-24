const collection = 'users';
const { response } = require('express');
const res = require('express/lib/response');
const UserModel = require('../models/user');
const createError = require('http-errors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const { createUserSchema, updateUserSchema } = require('../helpers/validation_schema');

// #swagger.tags = ['Users']

// const testCreateUser = async (req, res) => {
//   res.send({});
//   // res.status(200);
//   // res.sendStatus(200);
// }

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserModel.find();
    res.json(request);
  } catch (err) {
    // res.json({
    //   message: err
    // });
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserModel.findById(req.params.id);
    if (!request) {
      throw createError(404, "User doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid User id'));
      return;
    }
    next(err);
  }
};

const getUser = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserModel.find({
      displayName: {
        $regex: req.params.user,
        $options: 'i'
      }
    });
    if (!request) {
      throw createError(404, req.params.user + ' not found');
    }
    res.json(request);
  } catch (err) {
    res.json({ message: 'Invalid request' });
  }
};

const registerUser = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  console.log(req.body);
  let errors = [];

  if (!email || !firstname || !lastname || !password) {
    errors.push({ msg: 'Fields cannot be left blank.' });
  }

  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters.' });
  }

  if (errors.length > 0) {
    res.render('register', {
      layout: 'login',
      errors,
      email,
      password
    });
    console.log(errors);
  } else {
    UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          layout: 'login',
          errors,
          email,
          password
        });
        console.log(errors);
      } else {
        const newUser = new UserModel({
          email,
          firstname,
          lastname,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                // req.flash(
                //   'success_msg',
                //   'You are now registered and can log in.'
                // );
                console.log('You are now registered and can log in.');
                res.redirect('/dashboard');
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
};

const delete_user = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserModel.findByIdAndDelete({
      _id: req.params.id
    });
    if (!request) {
      throw createError(404, "User doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid User id'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  getUser,
  registerUser,
  delete_user
};
