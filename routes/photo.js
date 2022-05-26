const express = require('express');
const photoController = require('../controllers/photo');
const router = express.Router();

router.get('/', photoController.getAll);
router.get('/:id', photoController.getSingle);
router.post('/', photoController.create_photo);
router.put('/:id', photoController.update_photo);
router.delete('/:id', photoController.delete_photo);

module.exports = router;
