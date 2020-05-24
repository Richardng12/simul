import { createStore } from 'redux';
import {
  login,
  loginFail,
  loginSuccess,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
} from '../store/profile/profileActions';
import profileReducer from '../store/profile/profileReducer';

describe('test profile actions', () => {
  let store;

  beforeEach(() => {
    store = createStore(profileReducer);
  });

  it('checks initial value of profile state', () => {
    const keys = Object.keys(store.getState());
    expect(keys.length).toBe(4);
    expect(store.getState().loading).toBe(false);
    expect(store.getState().isAuthenticated).toBe(false);
  });

  it('getting user info', () => {
    store.dispatch(getUserInfo());
    expect(store.getState().loading).toBe(true);
  });

  it('getting user info success', () => {
    const user = {
      _id: 'asdfasdf',
      username: 'testuser',
      displayName: 'test User',
      spotifyId: 'asdfasef',
      country: 'NZ',
      email: 'asdfasdf@gmail.com',
      thumbnail: '',
      profileUrl: 'asdfasdfasfd',
      accessToken: 'test',
      refreshToken: 'test',
    };
    store.dispatch(getUserInfoSuccess(user));
    expect(store.getState().user).toBe(user);
  });

  it('getting user info fail', () => {
    store.dispatch(getUserInfoFail('fail'));
    expect(store.getState().message).toBe('fail');
  });

  it('log in', () => {
    store.dispatch(login());
    expect(store.getState().loading).toBe(true);
  });

  it('log in success', () => {
    store.dispatch(loginSuccess());
    expect(store.getState().isAuthenticated).toBe(true);
  });

  it('log in fail', () => {
    store.dispatch(loginFail());
    expect(store.getState().message).toBe('fail');
    expect(store.getState().isAuthenticated).toBe(false);
  });
});
