const mongoose = require('mongoose');

function connect() {
    return mongoose.connect('mongodb+srv://simul-admin:pc4fKJQyEYicfSOP@simul-nf8yd.mongodb.net/Simul?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

function drop() {
    return mongoose.connection.dropDatabase();
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, drop, close };