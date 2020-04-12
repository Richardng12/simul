import { actionTypes } from './lobbyActions';

const initialState = {
  lobbies: [],
  loading: false,
};

const lobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getAllLobbies:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.getAllLobbies_success:
      return {
        ...state,
        loading: false,
        lobbies: action.lobbies,
      };
    case actionTypes.getAllLobbies_fail:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    default:
      return {
        ...state,
      };
  }
};

export default lobbyReducer;
