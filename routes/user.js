
const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', usersController.create_user);
router.put('/:id', usersController.update_user);
router.delete('/:id', usersController.delete_user);

module.exports = router;