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
  res.redirect('/');
});

module.exports = router;
