const express = require('express');
const User = require('../db/models/userModel');

const router = express.Router();
const Lobby = require('../db/models/lobbyModel');


router.get('/', async(req, res) => {
    try {
        const lobby = await Lobby.find();
        res.json(lobby);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.post('/createtest', async (req, res) => {
  const lobby = new Lobby({
    name: "lobbytest",
    private: "yes"
  });
  try {
    const newLobby = await lobby.save();
    res.status(201).json(newLobby);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;