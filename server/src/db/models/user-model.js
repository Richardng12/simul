const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  displayName: String,
  profileUrl: String,
  country: String,
  emails: [],
  thumbnail: String,
  spotifyId: String,
  accessToken: String,
  refreshToken: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
