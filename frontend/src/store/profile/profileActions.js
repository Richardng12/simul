export const actionTypes = {
  updateUserName: 'UPDATE_USERNAME',
};

const updateUserName = songId => ({
  type: actionTypes.updateUserName,
  payload: songId,
});

export { updateUserName };
