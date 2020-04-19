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

// search songs
router.get('/songs', access.ensureAuthenticated, async (req, res) => {
  const apiCall = async () => {
    try {
      spotifyApi.setAccessToken(req.user.accessToken);
      spotifyApi.setRefreshToken(req.user.refreshToken);
      const songList = await spotifyApi.searchTracks(req.body.value, { limit: 10 });
      res.status(200).json(songList.body.tracks.items);
    } catch (err) {
      res.status(400).json({ message: 'no songs found' });
    }
  };
  access.getAccess(apiCall, req, res);
});

module.exports = router;
