const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const access = require('./auth/access');

const router = express.Router();
const Lobby = require('../db/models/lobbyModel');
const Song = require('../db/models/songModel');

const spotifyApi = new SpotifyWebApi({});
// middleware fuction
async function getLobby(req, res, next) {
  try {
    const lobby = await Lobby.findById(req.params.id);
    if (lobby == null) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
    res.lobby = lobby;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
  return null;
}

// Get all lobbies
router.get('/', access.ensureAuthenticated, async (req, res) => {
  try {
    const lobby = await Lobby.find();
    res.status(200).send(lobby);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one lobby
router.get('/:id', access.ensureAuthenticated, async (req, res) => {
  try {
    const lobby = await Lobby.findById(req.params.id);
    res.status(200).json(lobby);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a lobby and add the creator to list of users
router.post('/', access.ensureAuthenticated, async (req, res) => {
  const lobby = new Lobby({
    name: req.body.name,
    isPublic: req.body.isPublic,
    createdBy: req.user._id,
    code: req.body.code,
    users: [req.user._id],
    password: req.body.password,
  });
  try {
    const newLobby = await lobby.save();
    res.status(201).json(newLobby);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a lobby
router.delete('/:id', access.ensureAuthenticated, async (req, res) => {
  try {
    await Lobby.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Update a lobby name
router.put('/:id', access.ensureAuthenticated, async (req, res) => {
  try {
    if (req.body.name != null) {
      await Lobby.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } });
      const updatedLobby = await Lobby.findById(req.params.id);
      res.status(200).json(updatedLobby);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add song to lobby queue
router.patch('/:id/songs', access.ensureAuthenticated, getLobby, async (req, res) => {
  const apiCall = async () => {
    try {
      spotifyApi.setAccessToken(req.user.accessToken);
      spotifyApi.setRefreshToken(req.user.refreshToken);
      const songData = await spotifyApi.getTrack(req.body.spotifyId);
      const song = new Song({
        title: songData.body.name,
        artist: songData.body.artists[0].name,
        addedBy: req.user._id,
        spotifyId: req.body.spotifyId,
      });
      res.lobby.songs.push(song);
      const updatedQueue = await res.lobby.save();
      res.status(200).json(updatedQueue.songs);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  access.getAccess(apiCall, req, res);
});

// Add a user into lobby
router.patch('/:id/users', access.ensureAuthenticated, getLobby, async (req, res) => {
  res.lobby.users.push(req.user._id);
  try {
    const updatedLobby = await res.lobby.save();
    res.status(200).json(updatedLobby.users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id/songs', access.ensureAuthenticated, async (req, res) => {
  try {
    await Lobby.updateOne(
      { _id: req.params.id },
      { $pull: { songs: { $elemMatch: { spotifyId: req.body.spotifyId } } } },
    );
    res.status(200).json({ message: 'Song has been deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
