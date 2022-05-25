const passport = require('passport');
const router = require('express').Router();

// @desc      Auth with Google
// @route     GET /auth/google
router.get(
  // #swagger.ignore = true
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

// @desc      Google auth callback
// @route     GET /auth/google/callback
router.get(
  // #swagger.ignore = true
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// @desc Logout User
// @route /auth/logout
router.get('/logout', (req, res) => {
  // #swagger.ignore = true
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/');
});

router.post('/login', (req, res) => {
  // #swagger.ignore = true
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/emaillogin',
    failureFlash: true,
    failureFlash: 'Please check your email and password.'
  })(req, res);
});

module.exports = router;
