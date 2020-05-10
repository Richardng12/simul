export const actionTypes = {
  getChats: 'GET_CHATS',
  getChats_success: 'GET_CHATS_SUCCESS',
  getChats_fail: 'GET_CHATS_FAIL',
  afterPostMessage: 'AFTER_POST_MESSAGE',
  // afterPostMessage_success: 'AFTER_POST_MESSAGE_SUCCESS',
  // afterPostMessage_fail: 'AFTER_POST_MESSAGE_FAIL',
};

const getChats = lobbyId => ({
  type: actionTypes.getChats,
  lobbyId,
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

// const afterPostMessageSuccess = addedData => ({
//   type: actionTypes.afterPostMessage,
//   addedData,
// });

// const afterPostMessageFail = message => ({
//   type: actionTypes.afterPostMessage,
//   message,
// });

export {
  getChats,
  afterPostMessage,
  getChatsSuccess,
  getChatsFail,
  // afterPostMessageSuccess,
  // afterPostMessageFail,
};
