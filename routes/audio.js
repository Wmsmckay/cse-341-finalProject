const express = require('express');
const audioController = require('../controllers/audio');
const router = express.Router();

router.get('/', audioController.getAll);
router.get('/:id', audioController.getSingle);
router.post('/', audioController.create_audio);
router.put('/:id', audioController.update_audio);
router.delete('/:id', audioController.delete_audio);

module.exports = router;
