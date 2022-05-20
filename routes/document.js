const express = require('express');
const documentController = require('../controllers/document');
const router = express.Router();

router.get('/', documentController.getAll);
router.get('/:id', documentController.getSingle);
router.get('/title/:title', documentController.getTitle);
router.post('/', documentController.create_document);
router.put('/:id', documentController.update_document);
router.delete('/:id', documentController.delete_document);

module.exports = router;
