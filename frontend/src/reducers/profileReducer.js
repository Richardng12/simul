import { UpdateUsername } from '../actions/actionTypes';

const initialState = {
  username: 'Richard Ng',
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
