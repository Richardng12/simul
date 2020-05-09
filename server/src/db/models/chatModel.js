const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    type: {
      type: String,
    },
    lobby: {
      type: Schema.Types.ObjectId,
      ref: 'lobby',
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
