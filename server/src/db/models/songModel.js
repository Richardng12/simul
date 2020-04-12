const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema({
  title: String,
  artist: String,
  addedBy: String,
  spotifyId: String,
});

const Song = mongoose.model('song', songSchema);

module.exports = Song;
