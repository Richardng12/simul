const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const mongodb = require('mongodb');
const access = require('./auth/access');

const router = express.Router();
const Lobby = require('../db/models/lobbyModel');
const Song = require('../db/models/songModel');

const spotifyApi = new SpotifyWebApi({});
// middleware fuction
async function getLobby(req, res, next) {
  try {
    const lobby = await Lobby.findById(req.params.id);
    res.lobby = lobby;
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
  next();
  return null;
}

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
    res.status(404).json({ message: 'lobby not found' });
  }
});

// Create a lobby and add the creator to list of users
router.post('/', access.ensureAuthenticated, async (req, res) => {
  const lobby = new Lobby({
    name: req.body.name,
    isPublic: req.body.isPublic,
    createdBy: req.user._id,
    code: req.body.code,
    users: [req.user],
    songs: req.body.songs,
    password: req.body.password,
    songStartTimeStamp: null,
    timeStampDifferential: 0,
  });
  try {
    const existingLobby = await Lobby.find({ name: req.body.name });
    if (existingLobby.length !== 0) {
      res.status(202).json({ message: 'lobby name taken' });
    } else if (
      req.body.isPublic === false &&
      (!req.body.password || req.body.password.length === 0)
    ) {
      res.status(202).json({ message: 'no password entered' });
    } else {
      const newLobby = await lobby.save();
      res.status(201).json(newLobby);
    }
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
    res.status(200).send(await Lobby.find());
  } catch (err) {
    res.status(404).json({ message: 'lobby not found' });
  }
});

// Update a lobby name
router.put('/:id', access.ensureAuthenticated, async (req, res) => {
  try {
    if (req.body.name != null) {
      await Lobby.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } });
      const updatedLobby = await Lobby.findById(req.params.id);
      res.status(200).json(updatedLobby);
    } else {
      res.status(202).json({ message: 'name not changed' });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Add song to lobby queue
router.patch('/:id/songs', access.ensureAuthenticated, getLobby, async (req, res) => {
  const apiCall = async () => {
    try {
      spotifyApi.setAccessToken(req.user.accessToken);
      spotifyApi.setRefreshToken(req.user.refreshToken);
      const songData = await spotifyApi.getTrack(req.body.spotifySongId);

      const song = new Song({
        title: songData.body.name,
        artist: songData.body.artists[0].name,
        addedBy: req.user._id,
        spotifySongId: req.body.spotifySongId,
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
  try {
    const findUserInLobby = res.lobby.users.find(user => {
      return JSON.stringify(user._id) === JSON.stringify(req.user._id);
    });
    if (findUserInLobby !== undefined) {
      res.status(202).json(res.lobby.users);
    } else {
      await res.lobby.users.push(req.user);
      await res.lobby.save();
      res.status(200).json(res.lobby.users);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove user from lobby
router.delete('/:id/users', access.ensureAuthenticated, async (req, res) => {
  try {
    const objectId = new mongodb.ObjectID(req.body.id);
    await Lobby.updateOne({ _id: req.params.id }, { $pull: { users: { _id: objectId } } });
    res.status(200).json([]);
  } catch (err) {
    res.status(400).json({ message: 'did not delete user' });
  }
});

// Remove song from lobby queue
router.delete('/:id/songs', access.ensureAuthenticated, async (req, res) => {
  try {
    const objectId = new mongodb.ObjectID(req.body.id);
    await Lobby.updateOne({ _id: req.params.id }, { $pull: { songs: { _id: objectId } } });
    const updatedLobby = await Lobby.findById(req.params.id);
    res.status(200).json(updatedLobby.songs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get currentsong
router.get('/:id/songs/current', access.ensureAuthenticated, getLobby, async (req, res) => {
  try {
    res.status(200).json(res.lobby.songs[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get timestamp in seconds
router.get('/:id/songs/timestamp', access.ensureAuthenticated, getLobby, async (req, res) => {
  try {
    const timePlaying = new Date() - res.lobby.songStartTimeStamp;
    const timePlayingInSeconds = timePlaying / 1000;
    res.status(200).json(timePlayingInSeconds);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update the current song timestamp of the current lobby
router.put('/:id/songs/timestamp', access.ensureAuthenticated, async (req, res) => {
  try {
    await Lobby.updateOne({ _id: req.params.id }, { $set: { songStartTimeStamp: new Date() } });
    //  const updatedLobby = await Lobby.findById(req.params.id);
    res.status(200).json(new Date());
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
