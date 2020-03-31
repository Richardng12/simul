const express = require('express'),
  session = require('express-session'),
  passport = require('passport'),
  swig = require('swig');

const authRoutes = require('./src/routes/auth-routes');
const passportSetup = require('./src/config/passport-setup');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const keys = require('./src/config/keys');
const cookieSession = require('cookie-session');

const SpotifyWebApi = require('spotify-web-api-node');
var refresh = require('passport-oauth2-refresh');

const User = require('./src/db/models/user-model');

const app = express();

var spotifyApi = new SpotifyWebApi({
  clientId: keys.spotify.clientId,
  clientSecret: keys.spotify.clientSecret,
  redirectUri: '/auth/spotify/callback',
});

//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //1 day in milliseconds
    keys: [keys.session.cookieKey],
  }),
);

// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', consolidate.swig);

//set-up auth routes
app.use('/auth', authRoutes);

//home route
app.get('/', (req, res) => {
  res.render('index.html', { user: req.user });
});

//account route
app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account.html', { user: req.user });
});

//login route
app.get('/login', (req, res) => {
  res.render('login.html', { user: req.user });
});

app.get('/userinfo', ensureAuthenticated, async (req, res) => {
  try {
    spotifyApi.setAccessToken(req.user.accessToken);
    spotifyApi.setRefreshToken(req.user.refreshToken);
    var result = await spotifyApi.getMe();
    console.log(result.body);
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/playlists', ensureAuthenticated, async (req, res) => {
  console.log('access token at start: (wrong) : ' + req.user.accessToken);
  var retries = 2;

  var send401Response = () => {
    console.log('401 error');
    return res.status(401).end();
  };

  User.findById(req.user, (err, user) => {
    if (err || !user) {
      return send401Response();
    }

    const makeRequest = async () => {
      retries--;
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
      } catch (err) {
        if (err.statusCode == 401) {
          // Access token expired.
          // Try to fetch a new one.
          refresh.requestNewAccessToken('spotify', user.refreshToken, (err, accessToken) => {
            if (err || !accessToken) {
              return send401Response();
            }

            // Save the new accessToken for future use
            user.accessToken = accessToken;

            user.save(() => {
              makeRequest();
              // Retry the request.
            });

            User.updateOne(
              { _id: req.user.id },
              {
                accessToken: accessToken,
              },
              (err, affected, resp) => {},
            );
          });
        } else {
          // There was another error, handle it appropriately.
          return send401Response();
        }
      }
    };
    // Make the initial request.
    makeRequest();
  });
});

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
}

module.exports = app;
