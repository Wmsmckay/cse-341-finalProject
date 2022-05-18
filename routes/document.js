const express = require('express');
const documentController = require('../controllers/documents');
const router = express.Router();

router.get('/', documentController.getAll);
router.get('/:id', documentController.getSingle);
router.post('/', documentController.create_document);
router.put('/:id', documentController.update_document);
router.delete('/:id', documentController.delete_document);


module.exports = router;
