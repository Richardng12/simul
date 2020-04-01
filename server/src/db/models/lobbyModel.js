const mongoose = require('mongoose');

const { Schema } = mongoose;

const lobbySchema = new Schema(
    {
        name: String,
        private: Boolean,
        user_array: [],
    },
);

const Lobby = mongoose.model('lobby', lobbySchema)
module.exports = Lobby;