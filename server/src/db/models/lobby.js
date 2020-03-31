const mongoose = require('mongoose');

const lobbySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
        },
        private: {
            type: Boolean,
            required: true,
        },
        user_array: {
            type: Array,
            require: true,
        }
    },
);


module.exports = mongoose.model('Lobby', lobbySchema);