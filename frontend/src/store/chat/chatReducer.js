import { actionTypes } from './chatActions';

const initialState = {
  chats: [
    { _id: '', message: '', sender: {}, lobbyId: {}, type: '', createdAt: '', updatedAt: '' },
  ],
  loading: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getChats:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.getChats_success:
      return {
        ...state,
        chats: action.chats,
        loading: false,
      };
    case actionTypes.getChats_fail:
      return {
        ...state,
        message: action.message,
        loading: false,
      };
    //  set state of chats to all current chats plus the message that was just sent
    case actionTypes.afterPostMessage:
      return {
        ...state,
        chats: state.chats.concat(action.data),
      };
    // case actionTypes.afterPostMessage:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case actionTypes.afterPostMessage_success:
    //   return {
    //     ...state,
    //     chats: action.addedData,
    //   };
    // case actionTypes.afterPostMessage_fail:
    //   return {
    //     ...state,
    //     message: action.message,
    //     loading: false,
    //   };
    default:
      return state;
  }
};

export default chatReducer;
