const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: false,
        },
    },
)

module.exports = mongoose.model('User', userSchema);