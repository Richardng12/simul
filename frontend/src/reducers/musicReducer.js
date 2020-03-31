import { UpdateCurrentSong } from '../actions/actionTypes';

const initialState = {
  currentSong: 'Contact',
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case UpdateCurrentSong:
      return {
        ...state,
        currentSong: action.payload,
      };
    default:
      return state;
  }
};

export default musicReducer;
