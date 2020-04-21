export const actionTypes = {
  getAllLobbies: 'GET_ALL_LOBBIES',
  getAllLobbies_success: 'GET_ALL_LOBBIES_SUCCESS',
  getAllLobbies_fail: 'GET_ALL_LOBBIES_FAIL',
  addLobby: 'ADD_LOBBY',
  addLobby_success: 'ADD_LOBBY_SUCCESS',
  addLobby_fail: 'ADD_LOBBY_FAIL',
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

const addLobby = () => ({
  type: actionTypes.addLobby,
});

export { getAllLobbies, getAllLobbiesSuccess, getAllLobbiesFail, addLobby };
