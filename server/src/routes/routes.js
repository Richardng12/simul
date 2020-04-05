const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const refresh = require('passport-oauth2-refresh');
const User = require('../db/models/userModel');

const router = express.Router();

const spotifyApi = new SpotifyWebApi({});

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

/**
 * @swagger
 * tags:
 *  - name: playlists
 *    description: [Playlist management]
 *  - name: users
 *    description: [User management]
 *  - name: songs
 *    description: [Song management]
 */

/**
 * @swagger
 * path:
 *  /playlists/:
 *    post:
 *      summary: Get all playlists associated with a user
 *      tags: [playlists]
 *      responses:
 *        "200":
 *          description: An array of playlist items
 *          content:
 *            application/json:
 */
router.get('/playlists', ensureAuthenticated, async (req, res) => {
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

router.get('/userinfo', ensureAuthenticated, async (req, res) => {
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
        spotifyApi.setAccessToken(req.user.accessToken);
        spotifyApi.setRefreshToken(req.user.refreshToken);
        const result = await spotifyApi.getMe();
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

/**
 * @swagger
 * path:
 *  /savedtracks/:
 *    get:
 *      summary: Get all saved tracks associated with a user
 *      tags: [songs]
 *      responses:
 *        "200":
 *          description: An array of track items
 *          content:
 *            application/json:
 */
router.get('/savedtracks', ensureAuthenticated, async (req, res) => {
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
        spotifyApi.setAccessToken(req.user.accessToken);
        spotifyApi.setRefreshToken(req.user.refreshToken);
        const result = await spotifyApi.getMySavedTracks();
        res.status(200).send(result.body.items);
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

router.post('/createPlaylist', ensureAuthenticated, async (req, res) => {
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
        spotifyApi.setAccessToken(req.user.accessToken);
        spotifyApi.setRefreshToken(req.user.refreshToken);
        const result = await spotifyApi.createPlaylist('My Cool Playlist', { public: false });
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

module.exports = router;
