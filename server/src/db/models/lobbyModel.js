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
  users: [],
  songs: [],
  password: {
    type: String,
    required: () => {
      return this.isPublic;
    },
  },
});

const Lobby = mongoose.model('lobby', lobbySchema);

module.exports = Lobby;
