import { actionTypes } from './lobbyActions';

const initialState = {
  lobbies: [],
  loading: false,
  currentLobby: null,
  lobbyId: '',
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
    case actionTypes.getSingleLobby:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.getSingleLobby_success:
      return {
        ...state,
        loading: false,
        currentLobby: action.lobby,
      };
    case actionTypes.getSingleLobby_fail:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case actionTypes.setCurrentLobbyId:
      return {
        ...state,
        lobbyId: action.lobbyId,
      };
    case actionTypes.addLobby:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.addLobby_success:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.addLobby_fail:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.addSongToQueue:
      return {
        ...state,
      };
    case actionTypes.addSongToQueue_success:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default lobbyReducer;
