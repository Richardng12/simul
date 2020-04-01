const express = require('express');
const passport = require('passport');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const SpotifyWebApi = require('spotify-web-api-node');
const refresh = require('passport-oauth2-refresh');
const keys = require('./src/config/keys');
const authRoutes = require('./src/routes/authRoutes');
const lobbyRoutes = require('./src/routes/lobbyRoutes');
const User = require('./src/db/models/userModel');

require('./src/config/passportSetup');

const app = express();

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
  return null;
}

const spotifyApi = new SpotifyWebApi({
  clientId: keys.spotify.clientId,
  clientSecret: keys.spotify.clientSecret,
  redirectUri: '/auth/spotify/callback',
});

// connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// configure Express
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    keys: [keys.session.cookieKey],
  }),
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', consolidate.swig);

// set-up auth routes
app.use('/auth', authRoutes);

app.use('/lobbies', lobbyRoutes);

// home route
app.get('/', (req, res) => {
  res.render('index.html', { user: req.user });
});

// account route
app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account.html', { user: req.user });
});

// login route
app.get('/login', (req, res) => {
  res.render('login.html', { user: req.user });
});

app.get('/userinfo', ensureAuthenticated, async (req, res) => {
  try {
    spotifyApi.setAccessToken(req.user.accessToken);
    spotifyApi.setRefreshToken(req.user.refreshToken);
    const result = await spotifyApi.getMe();
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/playlists', ensureAuthenticated, async (req, res) => {
  let retries = 3;

  const send401Response = () => {
    return res.status(401).end();
  };

  User.findById(req.user, (err, user) => {
    if (err || !user) {
      return send401Response();
    }

    const makeRequest = async () => {
      retries -= 1;
      if (!retries) {
        // Couldn't refresh the access token. Tried twice.
        return send401Response();
      }

      // Set the credentials and make the request.
      try {
        spotifyApi.setAccessToken(user.accessToken);
        spotifyApi.setRefreshToken(user.refreshToken);
        const result = await spotifyApi.getUserPlaylists();
        res.status(200).send(result.body);
      } catch (error) {
        if (error.statusCode === 401) {
          // Access token expired.
          // Try to fetch a new one.
          refresh.requestNewAccessToken('spotify', user.refreshToken, (tokenError, accessToken) => {
            if (tokenError || !accessToken) {
              return send401Response();
            }

            // Save the new accessToken for future use
            // eslint-disable-next-line no-param-reassign
            user.accessToken = accessToken;

            user.save(() => {
              makeRequest();
              // Retry the request.
            });

            User.updateOne(
              { _id: req.user.id },
              {
                accessToken,
              },
            );
            return null;
          });
        } else {
          // There was another error, handle it appropriately.
          return send401Response();
        }
      }
      return null;
    };
    // Make the initial request.
    makeRequest();
    return null;
  });
});

module.exports = app;
