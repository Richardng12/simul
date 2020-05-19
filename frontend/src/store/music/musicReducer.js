import { actionTypes } from './musicActions';

const initialState = {
  currentSong: null,
  currentDevice: null,
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateCurrentSong:
      return {
        ...state,
        currentSong: action.song,
      };
    case actionTypes.setDevice:
      return {
        ...state,
        currentDevice: action.deviceId,
      };
    default:
      return state;
  }
};

export default musicReducer;
