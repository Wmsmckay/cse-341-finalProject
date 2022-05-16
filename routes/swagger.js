const router = require('express').Router();
const swaggerUiExpress = require('swagger-ui-express');
const swaggerDoc = require('../../swagger-output.json');

router.use('/', swaggerUiExpress.serve);
router.get('/', swaggerUiExpress.setup(swaggerDoc));

module.exports = router;
