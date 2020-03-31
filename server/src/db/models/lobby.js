const mongoose = require('mongoose');

const lobbySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user_ids: {
            type: Array,
        },
    },
);


module.exports = mongoose.model('Lobby', lobbySchema);