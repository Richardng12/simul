export const actionTypes = {
  getChats: 'GET_CHATS',
  getChats_success: 'GET_CHATS_SUCCESS',
  getChats_fail: 'GET_CHATS_FAIL',
  afterPostMessage: 'AFTER_POST_MESSAGE',
};

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

export { getChats, afterPostMessage, getChatsSuccess, getChatsFail };
