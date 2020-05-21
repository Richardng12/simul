export const actionTypes = {
  updateCurrentSong: 'UPDATE_CURRENT_SONG',
  setDevice: 'SET_DEVICE',
};

const updateCurrentSong = song => ({
  type: actionTypes.updateCurrentSong,
  song,
});

const setDevice = deviceId => ({
  type: actionTypes.setDevice,
  deviceId,
});

export { updateCurrentSong, setDevice };
