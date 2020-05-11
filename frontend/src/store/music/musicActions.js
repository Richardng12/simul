export const actionTypes = {
  updateCurrentSong: 'UPDATE_CURRENT_SONG',
  setDevice: 'SET_DEVICE',
};

const updateCurrentSong = songId => ({
  type: actionTypes.updateCurrentSong,
  payload: songId,
});

const setDevice = deviceId => ({
  type: actionTypes.setDevice,
  deviceId,
});

export { updateCurrentSong, setDevice };
