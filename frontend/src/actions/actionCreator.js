import { UpdateUsername, UpdateCurrentSong } from './actionTypes';

// eslint-disable-next-line no-unused-vars
export const updateUsername = username => ({
  type: UpdateUsername,
  payload: username,
});

// eslint-disable-next-line no-unused-vars
export const updateCurrentSong = songId => ({
  type: UpdateCurrentSong,
  payload: songId,
});
