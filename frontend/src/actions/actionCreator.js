import { UpdateUsername, UpdateCurrentSong } from './actionTypes';

// eslint-disable-next-line no-unused-vars
const updateUsername = username => ({
  type: UpdateUsername,
  payload: username,
});

// eslint-disable-next-line no-unused-vars
const updateCurrentSong = songId => ({
  type: UpdateCurrentSong,
  payload: songId,
});
