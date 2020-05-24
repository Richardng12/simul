import { actionTypes } from './musicActions';

const initialState = {
  currentSong: null,
  currentDevice: null,
  currentTracks: 0,
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateCurrentSong:
      console.log(action.song);
      return {
        ...state,
        currentSong: action.song.error ? null : action.song,
      };
    case actionTypes.setDevice:
      return {
        ...state,
        currentDevice: action.deviceId,
      };
    case actionTypes.setSeenTracks:
      return {
        ...state,
        currentTracks: action.seenTracks,
      };
    default:
      return state;
  }
};

export default musicReducer;
