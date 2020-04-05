export const actionTypes = {
  updateUserName: 'UPDATE_USERNAME',
  login: 'LOGIN',
  login_success: 'LOGIN_SUCCESS',
  login_fail: 'LOGIN_FAIL',
  getUserInfo: 'USER_INFO',
  getUserInfo_success: 'USER_INFO_SUCCESS',
  getUserInfo_fail: 'USER_INFO_FAIL',
};

const updateUserName = songId => ({
  type: actionTypes.updateUserName,
  payload: songId,
});

const login = () => ({
  type: actionTypes.login,
});

const loginFail = message => ({
  type: actionTypes.login_fail,
  message,
});

const loginSuccess = token => ({
  type: actionTypes.login_success,
  token,
});

const getUserInfo = () => ({
  type: actionTypes.getUserInfo,
});

export { updateUserName, login, loginFail, loginSuccess, getUserInfo };
