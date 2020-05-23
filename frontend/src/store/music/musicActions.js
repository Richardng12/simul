export const actionTypes = {
  updateCurrentSong: 'UPDATE_CURRENT_SONG',
  setDevice: 'SET_DEVICE',
  setSeenTracks: 'SET_SEEN_TRACKS',
};

const updateCurrentSong = song => ({
  type: actionTypes.updateCurrentSong,
  song,
});

const setDevice = deviceId => ({
  type: actionTypes.setDevice,
  deviceId,
});

const setSeenTracks = seenTracks => ({
  type: actionTypes.setSeenTracks,
  seenTracks,
});

export { updateCurrentSong, setDevice, setSeenTracks };
