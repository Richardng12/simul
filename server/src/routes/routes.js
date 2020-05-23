const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const refresh = require('passport-oauth2-refresh');
const fetch = require('node-fetch');

// const fs = require('fs');
const DOMParser = require('dom-parser');
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
  refresh.requestNewAccessToken(
    'spotify',
    req.user.refreshToken,
    async (tokenError, accessToken) => {
      // Save the new accessToken for future use
      // eslint-disable-next-line no-param-reassign
      User.updateOne(
        { _id: req.user.id },
        {
          accessToken,
        },
      );
      try {
        const user = await User.findById(req.user.id);
        user.accessToken = accessToken;
        user.save(() => {
          // Retry the request.
        });

        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
      return null;
    },
  );
});

// router.get('/user', access.ensureAuthenticated, async (req, res) => {
//   try {
//     const result = await User.findById(req.user._id);
//     res.status(200).send(result);
//   } catch (err) {
//     res.status(400);
//   }
// });

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
router.get('/getChats/:id', async (req, res) => {
  await Chat.find({ lobbyId: req.params.id })
    .populate('sender')
    // eslint-disable-next-line consistent-return
    .exec((err, chats) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(chats);
    });
});

router.patch('/afterPostMessage/:id', async (req, res) => {
  const { data } = req.body;
  await Chat.find({ lobbyId: req.params.id })
    .populate('sender')
    // eslint-disable-next-line consistent-return
    .exec((err, chats) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(chats.concat(data));
    });
});

router.get('/lyric', async (req, res) => {
  const { artist, song } = req.query;
  if (artist == null) {
    res.status(400).json({ message: 'no artist' });
  }

  if (song == null) {
    res.status(400).json({ message: 'no song' });
  }

  const fetchSong = () => {
    return fetch(`https://genius.com/${artist}-${song}-lyrics`);
  };

  const process = async () => {
    const lyric = await fetchSong();
    const response = await lyric.text();
    return response;
  };
  await process().then(resp => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(resp, 'text/html');
    const lyrics = dom.getElementsByClassName('lyrics');
    if (lyrics == null || lyrics[0] == null) {
      const newLyrics = dom.getElementsByClassName('Lyrics__Root-sc-1ynbvzw-0 jvlKWy')[0];
      if (newLyrics == null) {
        return res.status(400).json({ message: `Cannot find lyrics of:\n ${song} \n ${artist}` });
      }
      return res.status(200).send({ lyrics: `${newLyrics.innerHTML}` });
    }
    return res.status(200).send({ lyrics: `${lyrics[0].textContent}` });
  });
});

module.exports = router;
