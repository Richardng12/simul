const mongoose = require('mongoose');

const { Schema } = mongoose;

const lobbySchema = new Schema(
    {
        name: String,
        isPublic: Boolean,
        createdBy: String,
        code: String,
        users: [],
    },
);

const Lobby = mongoose.model('lobby', lobbySchema)
module.exports = Lobby;