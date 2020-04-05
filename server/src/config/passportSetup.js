const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const refresh = require('passport-oauth2-refresh');
const keys = require('./keys');
const User = require('../db/models/userModel');
const util = require('util');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, expires_in
//   and spotify profile), and invoke a callback with a user object.
const strategy = new SpotifyStrategy(
  {
    clientID: keys.spotify.clientID,
    clientSecret: keys.spotify.clientSecret,
    callbackURL: '/auth/spotify/callback',
  },
  (accessToken, refreshToken, expiresIn, profile, done) => {
    // passport callback function
    // check if user alrdy exists in db
    console.log(util.inspect(profile, false, null, true /* enable colors */));
    User.findOne({
      spotifyId: profile.id,
    }).then(currentUser => {
      if (currentUser) {
        done(null, currentUser);
        // user already in db
      } else {
        // user not in db
        new User({
          username: profile.username,
          displayName: profile.displayName,
          spotifyId: profile.id,
          country: profile.country,
          emails: profile.emails[0].value,
          thumbnail: profile.photos[0],
          profileUrl: profile.profileUrl,
          accessToken,
          refreshToken,
        })
          .save()
          .then(newUser => {
            done(null, newUser);
          });
      }
    });

    // asynchronous verification, for effect...
    process.nextTick(() => {
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.
    });
  },
);

passport.use(strategy);
refresh.use(strategy);
