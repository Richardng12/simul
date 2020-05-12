import { actionTypes } from './profileActions';

const initialState = {
  user: {
    _id: '',
    username: '',
    displayName: '',
    spotifyId: '',
    country: '',
    email: '',
    thumbnail: '',
    profileUrl: '',
    accessToken: '',
    refreshToken: '',
  },
  // username: '',
  // token: '',
  // userId: '',
  loading: false,
  isAuthenticated: false,
  message: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
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
      };
    case actionTypes.getUserInfo:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.getUserInfo_success:
      return {
        ...state,
        user: action.user,
        // username: action.user.display_name,
        // token: action.user.accessToken,
        // userId: action.userId,
        loading: false,
      };
    case actionTypes.getUserInfo_fail:
      return {
        ...state,
        message: action.message,
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
