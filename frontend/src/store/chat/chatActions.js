export const actionTypes = {
  getChats: 'GET_CHATS',
  getChats_success: 'GET_CHATS_SUCCESS',
  getChats_fail: 'GET_CHATS_FAIL',
  afterPostMessage: 'AFTER_POST_MESSAGE',
  postFile: 'POST_FILE',
  postFile_success: 'POST_FILE_SUCCESS',
  postFile_fail: 'POST_FILE_FAIL',
};

const postFile = formData => ({
  type: actionTypes.postFile,
  formData,
});

const postFileSuccess = formData => ({
  type: actionTypes.postFile,
  formData,
});

const postFileFail = message => ({
  type: actionTypes.postFile,
  message,
});

const getChats = () => ({
  type: actionTypes.getChats,
});

const getChatsSuccess = chats => ({
  type: actionTypes.getChats_success,
  chats,
});

const getChatsFail = message => ({
  type: actionTypes.getChats_fail,
  message,
});

const afterPostMessage = data => ({
  type: actionTypes.afterPostMessage,
  data,
});

export {
  getChats,
  afterPostMessage,
  getChatsSuccess,
  getChatsFail,
  postFile,
  postFileSuccess,
  postFileFail,
};
