const router = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  // #swagger.ignore = true
  res.render('login', {
    layout: 'login'
  });
});

// @desc    Login with email Page
// @route   GET /emaillogin
router.get('/emaillogin', ensureGuest, (req, res) => {
  // #swagger.ignore = true
  res.render('emaillogin', {
    layout: 'login'
  });
});

// @desc    Register Page
// @route   GET /registerpage
router.get('/registerpage', ensureGuest, (req, res) => {
  // #swagger.ignore = true
  res.render('register', {
    layout: 'login'
  });
});

router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', {
    // #swagger.ignore = true
    name: req.user.firstname
  });
  // req.flash('info', 'You have logged in.');
});

router.use(
  // #swagger.ignore = true
  '/auth',
  require('./auth')
);
router.use(
  // #swagger.ignore = true
  '/api-docs',
  ensureAuth,
  require('./swagger')
);
router.use(
  // #swagger.ignore = true
  '/register',
  require('./register')
);

// router.all('/session-flash', function (req, res) {
//   req.session.sessionFlash = {
//     type: 'info',
//     message: 'This is a flash message using custom middleware and express-session.'
//   };
//   res.redirect(301, '/');
// });

router.use('/register', require('./register'));

router.use('/audio', ensureAuth, require('./audio'));
router.use('/photo', ensureAuth, require('./photo'));
router.use('/video', ensureAuth, require('./video'));
router.use('/document', ensureAuth, require('./document'));
router.use('/user', ensureAuth, require('./user'));

module.exports = router;
