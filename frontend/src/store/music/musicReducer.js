import { actionTypes } from './musicActions';

const initialState = {
  currentSong: 'Contact',
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateCurrentSong:
      return {
        ...state,
        currentSong: action.payload,
      };
    default:
      return state;
  }
};

export default musicReducer;
