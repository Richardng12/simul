const mongoose = require('mongoose');

const { Schema } = mongoose;

const lobbySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: String,
  isPublic: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  code: String,
  users: [],
  songs: [],
  password: String,
});

const Lobby = mongoose.model('lobby', lobbySchema);

module.exports = Lobby;

/**
 * @swagger
 *  components:
 *    schemas:
 *      Lobby:
 *        type: object
 *        required:
 *          - name
 *          - isPublic
 *          - createdBy
 *          - users
 *          - songs
 *        properties:
 *           name:
 *              type: string
 *              description: Name for the lobby, needs to be unique
 *           isPublic:
 *              type: boolean
 *              description: Identify if lobby is public or private
 *           createdBy:
 *              type: string
 *              description: Identify the creator of the lobby
 *           users:
 *              type: array
 *              items:
 *                type: string
 *              description: Array containing users that are in the lobby
 *           songs:
 *              type: array
 *              items:
 *                $ref: './src/db/models/songModel.js'
 *              description: Array containing songs that are in the queue of the lobby
 */
