const mongoose = require('mongoose');

const { Schema } = mongoose;

const lobbySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: String,
  isPublic: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  code: String,
  users: [
    {
      type: String,
    },
  ],
  songs: [],
  password: String,
});

const Lobby = mongoose.model('lobby', lobbySchema);

module.exports = Lobby;
