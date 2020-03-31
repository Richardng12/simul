const mongoose = require('mongoose');

function connect() {
    return mongoose.connect('mongodb+srv://simul-admin:pc4fKJQyEYicfSOP@simul-nf8yd.mongodb.net/test?authSource=admin&replicaSet=Simul-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true',
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