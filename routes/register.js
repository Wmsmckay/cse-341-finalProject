const router = require('express').Router();
const userController = require('../controllers/user');

router.post('/', userController.registerUser);

module.exports = router;
