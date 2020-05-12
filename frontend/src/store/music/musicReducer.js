import { actionTypes } from './musicActions';

const initialState = {
  currentSong: 'Contact',
  currentDevice: null,
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateCurrentSong:
      return {
        ...state,
        currentSong: action.payload,
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
