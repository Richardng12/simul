export const actionTypes = {
  updateUserName: 'UPDATE_USERNAME',
  login: 'LOGIN',
  login_success: 'LOGIN_SUCCESS',
  login_fail: 'LOGIN_FAIL',
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

export { updateUserName, login, loginFail, loginSuccess };
