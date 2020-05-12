export const actionTypes = {
  getAllLobbies: 'GET_ALL_LOBBIES',
  getAllLobbies_success: 'GET_ALL_LOBBIES_SUCCESS',
  getAllLobbies_fail: 'GET_ALL_LOBBIES_FAIL',
  addLobby: 'ADD_LOBBY',
  addLobby_success: 'ADD_LOBBY_SUCCESS',
  addLobby_fail: 'ADD_LOBBY_FAIL',
  getSingleLobby: 'GET_SINGLE_LOBBY',
  getSingleLobby_success: 'GET_SINGLE_LOBBY_SUCCESS',
  getSingleLobby_fail: 'GET_SINGLE_LOBBY_FAIL',
  setCurrentLobbyId: 'CURRENT_LOBBY_ID',
  addSongToQueue: 'ADD_SONG_TO_QUEUE',
  addSongToQueue_success: 'ADD_SONG_TO_QUEUE_SUCCESS',
};

const getAllLobbies = () => ({
  type: actionTypes.getAllLobbies,
});

const getAllLobbiesSuccess = lobbies => ({
  type: actionTypes.getAllLobbies_success,
  lobbies,
});

const getAllLobbiesFail = message => ({
  type: actionTypes.getAllLobbies_fail,
  message,
});

const getSingleLobby = () => ({
  type: actionTypes.getSingleLobby,
});

const getSingleLobbySuccess = lobby => ({
  type: actionTypes.getSingleLobby_success,
  lobby,
});

const getSingleLobbyFail = message => ({
  type: actionTypes.getSingleLobby,
  message,
});

const addLobby = (name, isPublic, password) => ({
  type: actionTypes.addLobby,
  name,
  isPublic,
  password,
});

const addLobbySuccess = newLobby => ({
  type: actionTypes.addLobby_success,
  newLobby,
});

const addLobbyFail = () => ({
  type: actionTypes.addLobby_fail,
});

const setCurrentLobbyId = lobbyId => ({
  type: actionTypes.setCurrentLobbyId,
  lobbyId,
});

const addSongToQueue = spotifySongId => ({
  type: actionTypes.addSongToQueue,
  spotifySongId,
});

const addSongToQueueSuccess = queue => ({
  type: actionTypes.addSongToQueue_success,
  queue,
});

export {
  getAllLobbies,
  getAllLobbiesSuccess,
  getAllLobbiesFail,
  addLobby,
  addLobbySuccess,
  addLobbyFail,
  getSingleLobby,
  getSingleLobbySuccess,
  getSingleLobbyFail,
  setCurrentLobbyId,
  addSongToQueue,
  addSongToQueueSuccess,
};
