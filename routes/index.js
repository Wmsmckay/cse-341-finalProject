const router = require('express').Router();

// @desc    Login/Landing Page
// @route   GET /
router.get('/', (req, res) => {
  // #swagger.ignore = true
  res.render('login', {
    layout: 'login'
  });
});
router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    // #swagger.ignore = true
    name: req.user.firstName
  });
});
router.use(
  // #swagger.ignore = true
  '/auth',
  require('./auth')
);
router.use(
  // #swagger.ignore = true
  '/api-docs',
  require('./swagger')
);

router.use('/audio', require('./audio'));
router.use('/video', require('./video'));
router.use('/document', require('./document'));
router.use('/user', require('./user'));

module.exports = router;
