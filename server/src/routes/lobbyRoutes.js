const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const access = require('./auth/access')
const router = express.Router();
const Lobby = require('../db/models/lobbyModel');



//middleware fuction
async function getLobby(req, res, next) {
  try {
      lobby = await Lobby.findById(req.params.id)
      if (lobby == null) {
          return res.status(404).json({ message: 'Lobby not found'})
      }
  } 
  catch (err){
      return status(500).json({message: err.message})
  }
  res.lobby = lobby;
  next();
}


//Get all lobbies
router.get('/', access.ensureAuthenticated, async(req, res) => {
  try {
      const lobby = await Lobby.find();
      res.status(200).send(lobby);
      console.log(req.user.accessToken) 
  }
  catch (err) {
      res.status(500).json({message: err.message});
  }
});

//Get one lobby
router.get('/:id', access.ensureAuthenticated ,getLobby, async(req, res) => {
  res.status(200).send(res.lobby);
})

//Create a lobby and add the creator to list of users
router.post('/', access.ensureAuthenticated, async(req, res) => {
  const lobby = new Lobby({
    name: req.body.name,
    isPublic: req.body.isPublic,
    code: req.body.code,
    users: [req.user._id]
  });
  try {
    const newLobby = await lobby.save();
    res.status(201).json(newLobby);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//Delete a lobby
router.delete('/:id', access.ensureAuthenticated, getLobby, async(req, res) => {
  try {
    await res.lobby.remove()
    res.status(201).json({message: 'Lobby has been deleted'})
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

//Update a lobby name
router.patch('/:id', access.ensureAuthenticated, getLobby, async(req, res) => {
  if (req.body.name != null) {
    res.lobby.name = req.body.name
  }
  try {
    const updatedLobby = await res.lobby.save()
    res.status(201).json(updatedLobby)
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

//Add a user into lobby
router.post(':id/users', access.ensureAuthenticated, getLobby, async(req, res) => {
  res.lobby.users.push(req.user._id)
  try {
    const updatedLobby = await res.lobby.save()
    res.status(200).json(updatedLobby.users)
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})



module.exports = router;