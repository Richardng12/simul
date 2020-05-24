import { createStore } from 'redux';
import { getChats, afterPostMessage, getChatsSuccess } from '../store/chat/chatActions';
import chatReducer from '../store/chat/chatReducer';

describe('test profile actions', () => {
  let store;

  beforeEach(() => {
    store = createStore(chatReducer);
  });

  it('checks initial value of profile state', () => {
    const keys = Object.keys(store.getState());
    expect(keys.length).toBe(2);
    expect(store.getState().loading).toBe(false);
  });

  it('get chats', () => {
    store.dispatch(getChats());
    expect(store.getState().loading).toBe(true);
  });

  it('get chats success', () => {
    const chats = [
      {
        _id: '1',
        message: 'asdf',
        sender: {},
        lobbyId: {},
        type: 'msg',
        createdAt: '20/1/1000',
        updatedAt: '21/1/1000',
      },
      {
        _id: '2',
        message: 'qwer',
        sender: {},
        lobbyId: {},
        type: 'msg',
        createdAt: '20/1/1000',
        updatedAt: '22/1/1000',
      },
    ];
    store.dispatch(getChatsSuccess(chats));
    expect(store.getState().chats).toBe(chats);
  });

  it('after post message', () => {
    const message = {
      _id: '1',
      message: 'asdf',
      sender: {},
      lobbyId: {},
      type: 'msg',
      createdAt: '20/1/1000',
      updatedAt: '21/1/1000',
    };
    store.dispatch(afterPostMessage(message));
    expect(store.getState().chats).toMatchObject([expect.anything(), message]);
  });
});
