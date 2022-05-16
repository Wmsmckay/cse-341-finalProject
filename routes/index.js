const router = require('express').Router();

// @desc    Login/Landing Page
// @route   GET /
router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login'
  });
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    name: req.user.firstName
  });
});

router.use('/auth', require('./auth'));
router.use('/api-docs', require('./swagger'));
router.use('/audio', require('./audio'));
router.use('/video', require('./video'));
router.use('/document', require('./document'));
router.use('/user', require('./user'));

module.exports = router;
