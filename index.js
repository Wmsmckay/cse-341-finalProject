const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/audio', require('./audio'));
router.use('/video', require('./video'));
router.use('/documents', require('./documents'));

module.exports = router;
