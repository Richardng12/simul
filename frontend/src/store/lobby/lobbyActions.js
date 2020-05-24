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
  removeSongFromQueue: 'REMOVE_SONG_FROM_QUEUE',
  removeSongFromQueue_success: 'REMOVE_SONG_FROM_QUEUE_SUCCESS',
  setUsersInLobby: 'SET_USERS_IN_LOBBY',
  setUsersInLobby_success: 'SET_USERS_IN_LOBBY_SUCCESS',
  deleteLobby: 'DELETE_LOBBY',
  deleteLobby_success: 'DELETE_LOBBY_SUCCESS',
  setLobbyQueue: 'SET_LOBBY_QUEUE',
  setLobbyQueue_success: 'SET_LOBBY_QUEUE_SUCCESS',
  getCurrentSong: 'GET_CURRENT_SONG',
  getCurrentSong_success: 'GET_CURRENT_SONG_SUCCESS',
  getCurrentSong_fail: 'GET_CURRENT_SONG_FAIL',
  setSongTimeStamp: 'SET_SONG_TIME_STAMP',
  setSongTimeStamp_success: 'SET_SONG_TIME_STAMP_SUCCESS',
  setSongTimeStamp_fail: 'SET_SONG_TIME_STAMP_FAIL',
  getTimeStampDifferential: 'GET_TIME_STAMP_DIFFERENTIAL',
  getTimeStampDifferential_success: 'GET_TIME_STAMP_DIFFERENTIAL_SUCCESS',
  getTimeStampDifferential_fail: 'GET_TIME_STAMP_DIFFERENTIAL_FAIL',
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

const removeSongFromQueue = songId => ({
  type: actionTypes.removeSongFromQueue,
  songId,
});

const removeSongFromQueueSuccess = queue => ({
  type: actionTypes.removeSongFromQueue_success,
  queue,
});

const setUsersInLobby = lobbyId => ({
  type: actionTypes.setUsersInLobby,
  lobbyId,
});

const setUsersInLobbySuccess = users => ({
  type: actionTypes.setUsersInLobby_success,
  users,
});

const deleteLobby = lobbyId => ({
  type: actionTypes.deleteLobby,
  lobbyId,
});

const deleteLobbySuccess = lobbies => ({
  type: actionTypes.deleteLobbySuccess,
  lobbies,
});

const setLobbyQueue = id => ({
  type: actionTypes.setLobbyQueue,
  id,
});

const setLobbyQueueSuccess = queue => ({
  type: actionTypes.setLobbyQueue_success,
  queue,
});

const getCurrentSong = () => ({
  type: actionTypes.getCurrentSong,
});

const getCurrentSongSuccess = currentSong => ({
  type: actionTypes.getCurrentSong_success,
  currentSong,
});

const getCurrentSongFail = message => ({
  type: actionTypes.getCurrentSong_fail,
  message,
});

const setSongTimeStamp = () => ({
  type: actionTypes.setSongTimeStamp,
});

const setSongTimeStampSuccess = timestamp => ({
  type: actionTypes.setSongTimeStamp_success,
  timestamp,
});
const setSongTimeStampFail = message => ({
  type: actionTypes.setSongTimeStamp_fail,
  message,
});

const getTimeStampDifferential = () => ({
  type: actionTypes.getTimeStampDifferential,
});

const getTimeStampDifferentialSuccess = timestampDifferential => ({
  type: actionTypes.getTimeStampDifferential_success,
  timestampDifferential,
});

const getTimeStampDifferentialFail = message => ({
  type: actionTypes.getTimeStampDifferential_fail,
  message,
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
  removeSongFromQueue,
  removeSongFromQueueSuccess,
  setUsersInLobby,
  setUsersInLobbySuccess,
  deleteLobby,
  deleteLobbySuccess,
  setLobbyQueue,
  setLobbyQueueSuccess,
  getCurrentSong,
  getCurrentSongSuccess,
  getCurrentSongFail,
  setSongTimeStamp,
  setSongTimeStampSuccess,
  setSongTimeStampFail,
  getTimeStampDifferential,
  getTimeStampDifferentialSuccess,
  getTimeStampDifferentialFail,
};
