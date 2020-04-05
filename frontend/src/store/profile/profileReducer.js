import { actionTypes } from './profileActions';

const initialState = {
  username: 'Richard Ng',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateUserName:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
