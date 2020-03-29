import { UpdateUsername } from '../actions/actionTypes';

const initialState = {
  username: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UpdateUsername:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
