const express = require('express');
const videoController = require('../controllers/video');
const router = express.Router();

router.get('/', videoController.getAll);
router.get('/:id', videoController.getSingle);
router.get('/title/:title', videoController.getTitle);
router.post('/', videoController.create_video);
router.put('/:id', videoController.update_video);
router.delete('/:id', videoController.delete_video);

module.exports = router;
