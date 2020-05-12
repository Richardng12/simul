const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    message: {
      type: String,
    },
    lobbyId: {
      type: Schema.Types.ObjectId,
      ref: 'lobby',
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    type: {
      type: String,
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
