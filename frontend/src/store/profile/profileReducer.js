import { actionTypes } from './profileActions';

const initialState = {
  username: 'Richard Ng',
  loading: false,
  token: '',
  isAuthenticated: false,
  message: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateUserName:
      return {
        ...state,
        username: action.payload,
      };
    case actionTypes.login:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.login_fail:
      return {
        ...state,
        loading: false,
        message: 'fail',
        isAuthenticated: false,
      };
    case actionTypes.login_success:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: 'some token',
      };
    case actionTypes.getUserInfo:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default profileReducer;
