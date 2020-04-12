export const actionTypes = {
  getAllLobbies: 'GET_ALL_LOBBIES',
  getAllLobbies_success: 'GET_ALL_LOBBIES_SUCCESS',
  getAllLobbies_fail: 'GET_ALL_LOBBIES_FAIL',
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

export { getAllLobbies, getAllLobbiesSuccess, getAllLobbiesFail };
