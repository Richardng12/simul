import { createStore } from 'redux';
import {
  getAllLobbies,
  getAllLobbiesSuccess,
  getAllLobbiesFail,
  addLobby,
  addLobbySuccess,
  addLobbyFail,
  getSingleLobby,
  getSingleLobbySuccess,
  setCurrentLobbyId,
  addSongToQueueSuccess,
  removeSongFromQueueSuccess,
  setUsersInLobbySuccess,
  deleteLobbySuccess,
  getCurrentSongSuccess,
  setSongTimeStampSuccess,
  setSongTimeStampFail,
  getTimeStampDifferentialSuccess,
  getTimeStampDifferentialFail,
} from '../store/lobby/lobbyActions';
import lobbyReducer from '../store/lobby/lobbyReducer';

describe('test profile actions', () => {
  let store;

  beforeEach(() => {
    store = createStore(lobbyReducer);
  });

  it('checks initial value of lobby state', () => {
    const testInitialState = {
      lobbies: [],
      loading: false,
      currentLobby: null,
      lobbyId: '',
      users: [],
      currentQueue: [],
      songStartTimeStamp: null,
      currentSong: null,
      timeStampDifferential: null,
    };
    const keys = Object.keys(store.getState());
    expect(keys.length).toBe(9);
    expect(store.getState()).toStrictEqual(testInitialState);
  });

  it('get all lobbies', () => {
    store.dispatch(getAllLobbies());
    expect(store.getState().loading).toBe(true);
  });

  it('get all lobbies success', () => {
    const lobbies = [{ lobby: 'lobby1' }];
    store.dispatch(getAllLobbiesSuccess(lobbies));
    expect(store.getState().lobbies).toStrictEqual(lobbies);
    expect(store.getState().loading).toBe(false);
  });

  it('get all lobbies fail', () => {
    store.dispatch(getAllLobbiesFail('fail'));
    expect(store.getState().loading).toBe(false);
    expect(store.getState().message).toBe('fail');
  });

  it('add lobby', () => {
    store.dispatch(addLobby());
    expect(store.getState().loading).toBe(true);
  });

  it('add lobby success', () => {
    const lobby = { newLobby: 'lobby details' };
    store.dispatch(addLobbySuccess(lobby));
    expect(store.getState().lobbies).toStrictEqual([lobby]);
  });

  it('add lobby fail', () => {
    store.dispatch(addLobbyFail());
    expect(store.getState().loading).toBe(false);
  });

  it('get single lobby', () => {
    store.dispatch(getSingleLobby());
    expect(store.getState().loading).toBe(true);
  });

  it('get single lobby success', () => {
    const lobby = { lobbydetails: 'details' };
    store.dispatch(getSingleLobbySuccess(lobby));
    expect(store.getState().loading).toBe(false);
    expect(store.getState().currentLobby).toBe(lobby);
  });

  it('set current lobby id', () => {
    store.dispatch(setCurrentLobbyId('randomID'));
    expect(store.getState().lobbyId).toBe('randomID');
  });

  it('add song to queue success', () => {
    const queue = [{ song1: 'song1' }];
    store.dispatch(addSongToQueueSuccess(queue));
    expect(store.getState().currentQueue).toStrictEqual(queue);
  });

  it('remove song queue success', () => {
    const queue = [{ song1: 'song1' }];
    store.dispatch(removeSongFromQueueSuccess(queue));
    expect(store.getState().currentQueue).toStrictEqual(queue);
  });

  it('set users in lobby', () => {
    const users = [{ user1: 'user1details' }];
    store.dispatch(setUsersInLobbySuccess(users));
    expect(store.getState().users).toStrictEqual(users);
  });

  it('delete lobby success', () => {
    const lobbies = [{ lobby: 'lobby1' }];
    store.dispatch(deleteLobbySuccess(lobbies));
    expect(store.getState().lobbies).toStrictEqual(lobbies);
  });

  it('get current song success', () => {
    const currentSong = { song: 'songdetails' };
    store.dispatch(getCurrentSongSuccess(currentSong));
    expect(store.getState().currentSong).toStrictEqual(currentSong);
  });

  it('set song timestamp success', () => {
    const timetstamp = '11/11/11';
    store.dispatch(setSongTimeStampSuccess(timetstamp));
    expect(store.getState().songStartTimeStamp).toBe(timetstamp);
  });

  it('set song timestamp fail', () => {
    store.dispatch(setSongTimeStampFail('fail'));
    expect(store.getState().message).toBe('fail');
  });

  it('get timestamp differential success', () => {
    const timetstamp = '00:10';
    store.dispatch(getTimeStampDifferentialSuccess(timetstamp));
    expect(store.getState().timeStampDifferential).toBe(timetstamp);
  });

  it('get timestamp differential fail', () => {
    store.dispatch(getTimeStampDifferentialFail('fail'));
    expect(store.getState().message).toBe('fail');
  });
});
