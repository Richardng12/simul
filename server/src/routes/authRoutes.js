const router = require('express').Router();
const passport = require('passport');

// auth login

router.get('/login', (req, res) => {
  res.render('login.html', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  res.redirect('/');
});

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-library-read', 'playlist-read-private'],
    showDialog: true,
  }),
);

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request with the code that spotify gives us.
//   If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//   Callback route for spotify to redirect to our web app
//   Handles serializing user, sending  cookie
router.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:8888/account');
  },
);

module.exports = router;
