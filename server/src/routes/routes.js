const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

// const fs = require('fs');
const access = require('./auth/access');
const User = require('../db/models/userModel');
const Chat = require('../db/models/chatModel');

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

// get spotify user info
router.get('/spotifyuserinfo', access.ensureAuthenticated, async (req, res) => {
  const apiCall = async () => {
    spotifyApi.setAccessToken(req.user.accessToken);
    spotifyApi.setRefreshToken(req.user.refreshToken);
    const result = await spotifyApi.getMe();
    result.body.accessToken = req.user.accessToken;
    res.status(200).send(result.body);
  };

  access.getAccess(apiCall, req, res);
});

// get user info from db
router.get('/userinfo', access.ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// search songs
router.get('/songs', access.ensureAuthenticated, async (req, res) => {
  const apiCall = async () => {
    try {
      spotifyApi.setAccessToken(req.user.accessToken);
      spotifyApi.setRefreshToken(req.user.refreshToken);
      const songList = await spotifyApi.searchTracks(req.query.value, { limit: req.query.limit });
      const responseList = songList.body.tracks.items.map(song => {
        return {
          title: song.name,
          artist: song.artists[0].name,
          spotifySongId: song.uri.split(':')[2],
        };
      });
      res.status(200).json(responseList);
    } catch (err) {
      res.status(400).json({ message: 'no songs found' });
    }
  };
  access.getAccess(apiCall, req, res);
});

// get all chats from db -> will need to extend to have lobbies somehow
router.get('/getChats', async (req, res) => {
  await Chat.find()
    .populate('sender')
    // eslint-disable-next-line consistent-return
    .exec((err, chats) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(chats);
    });
});

module.exports = router;
