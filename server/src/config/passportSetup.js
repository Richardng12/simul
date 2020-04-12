const passport = require('passport');

const refresh = require('passport-oauth2-refresh');
const MockStrategy = require('passport-mock-strategy');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('./keys');
const User = require('../db/models/userModel');
const mockUser = require('../../test/mocks/mockUser');

let AppropriateStrategy;
let options;
let verifyCallback;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.

if (process.env.NODE_ENV === 'test') {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
} else {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });
}

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, expires_in
//   and spotify profile), and invoke a callback with a user object.

if (process.env.NODE_ENV === 'test') {
  AppropriateStrategy = MockStrategy;
  options = {
    name: 'mock',
    user: mockUser,
  };
  verifyCallback = (user, done) => {
    done(null, user);
  };
} else {
  AppropriateStrategy = SpotifyStrategy;

  options = {
    clientID: keys.spotify.clientID,
    clientSecret: keys.spotify.clientSecret,
    callbackURL: '/auth/spotify/callback',
  };
  verifyCallback = (accessToken, refreshToken, expiresIn, profile, done) => {
    // passport callback function
    // check if user alrdy exists in db
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
          email: profile.emails[0].value,
          thumbnail: profile.photos[0] === null ? '' : profile.photos[0],
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
  };
}

// const strategy = new Strategy(
//   {
//     clientID: keys.spotify.clientID,
//     clientSecret: keys.spotify.clientSecret,
//     callbackURL: '/auth/spotify/callback',
//   },
//   (accessToken, refreshToken, expiresIn, profile, done) => {
//     // passport callback function
//     // check if user alrdy exists in db
//     User.findOne({
//       spotifyId: profile.id,
//     }).then(currentUser => {
//       if (currentUser) {
//         done(null, currentUser);
//         // user already in db
//       } else {
//         // user not in db
//         new User({
//           username: profile.username,
//           displayName: profile.displayName,
//           spotifyId: profile.id,
//           country: profile.country,
//           email: profile.emails[0].value,
//           thumbnail: profile.photos[0] == null,
//           profileUrl: profile.profileUrl,
//           accessToken,
//           refreshToken,
//         })
//           .save()
//           .then(newUser => {
//             done(null, newUser);
//           });
//       }
//     });

//     // asynchronous verification, for effect...
//     process.nextTick(() => {
//       // To keep the example simple, the user's spotify profile is returned to
//       // represent the logged-in user. In a typical application, you would want
//       // to associate the spotify account with a user record in your database,
//       // and return that user instead.
//     });
//   },
// );

passport.use('spotify', new AppropriateStrategy(options, verifyCallback));

if (process.env.NODE_ENV !== 'test') {
  refresh.use(new AppropriateStrategy(options, verifyCallback));
}
