const express = require('express');
const usersController = require('../controllers/user');
const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.get('/name/:user', usersController.getUserByName);
router.delete('/:id', usersController.delete_user);

module.exports = router;
