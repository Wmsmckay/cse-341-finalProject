const express = require('express');
const videoController = require('../controllers/video');
const router = express.Router();

router.get('/', videoController.getAll);
router.get('/:id', videoController.getSingle);
router.post('/', videoController.create_video);
router.put('/:id', videoController.update_video);
router.delete('/:id', videoController.delete_video);

module.exports = router;
