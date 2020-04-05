export const actionTypes = {
  updateCurrentSong: 'UPDATE_CURRENT_SONG',
};

const updateCurrentSong = songId => ({
  type: actionTypes.updateCurrentSong,
  payload: songId,
});

export { updateCurrentSong };
