const mongoose = require('mongoose');

const { Schema } = mongoose;

const lobbySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isPublic: Boolean,
  createdBy: String,
  code: String,
  users: [],
});

const Lobby = mongoose.model('lobby', lobbySchema);

module.exports = Lobby;
