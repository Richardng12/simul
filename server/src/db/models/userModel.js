const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  displayName: String,
  profileUrl: String,
  country: String,
  email: String,
  thumbnail: String,
  spotifyId: {
    type: String,
    required: true,
  },
  accessToken: String,
  refreshToken: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - displayName
 *          - profileUrl
 *          - country
 *          - email
 *          - spotifyId
 *          - accessToken
 *          - refreshToken
 *        properties:
 *          username:
 *            type: string
 *            description: Username for the user, needs to be unique
 *          displayName:
 *            type: string
 *            description: Real life name for the user
 *          profileUrl:
 *            type: string
 *            description: Link to the users profile
 *          country:
 *            type: string
 *            description: Country associated with the user
 *          email:
 *            type: string
 *            description: Email for the user
 *          thumbnail:
 *            type: string
 *            description: link to profiles thumbnail image
 *          spotifyId:
 *            type: string
 *            description: Spotify id associated with the user
 *          accessToken:
 *            type: string
 *            description: access token associated with the user
 *          refreshToken:
 *            type: string
 *            description: refresh token associated with the user
 *        example:
 *           name: johns12
 *           displayName: John Smith
 *           profileUrl:
 *           country: New Zealand
 *           email: johns12@gmail.com
 *           thumbnail: https://myimage.com/platform
 *           spotifyId: 123123123
 */
