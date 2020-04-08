const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const access = require('./auth/access');

const router = express.Router();

const spotifyApi = new SpotifyWebApi({});

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
router.get('/playlists', access.ensureAuthenticated, async (req, res) => {
  const apiCall = async () => {
    spotifyApi.setAccessToken(req.user.accessToken);
    spotifyApi.setRefreshToken(req.user.refreshToken);
    const result = await spotifyApi.getUserPlaylists();
    res.status(200).send(result.body);
  };

  access.getAccess(apiCall, req, res);
});

router.get('/userinfo', access.ensureAuthenticated, async (req, res) => {
  const apiCall = async () => {
    spotifyApi.setAccessToken(req.user.accessToken);
    spotifyApi.setRefreshToken(req.user.refreshToken);
    const result = await spotifyApi.getMe();
    res.status(200).send(result.body);
  };

  access.getAccess(apiCall, req, res);
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
router.get('/savedtracks', access.ensureAuthenticated, async (req, res) => {
  const apiCall = async () => {
    spotifyApi.setAccessToken(req.user.accessToken);
    spotifyApi.setRefreshToken(req.user.refreshToken);
    const result = await spotifyApi.getMySavedTracks();
    res.status(200).send(result.body.items);
  };

  access.getAccess(apiCall, req, res);
});

router.post('/createPlaylist', access.ensureAuthenticated, async (req, res) => {
  const apiCall = async () => {
    spotifyApi.setAccessToken(req.user.accessToken);
    spotifyApi.setRefreshToken(req.user.refreshToken);
    const result = await spotifyApi.createPlaylist('My Cool Playlist', { public: false });
    res.status(200).send(result.body);
  };

  access.getAccess(apiCall, req, res);
});

module.exports = router;
