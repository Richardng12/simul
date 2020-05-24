import { createStore } from 'redux';
import profileReducer from '../store/profile/profileReducer';

describe('test profile actions', () => {
  let store;

  beforeEach(() => {
    store = createStore(profileReducer);
  });

  it('checks initial value of profile state', () => {
    const keys = Object.keys(store.getState());
    expect(keys.length).toBe(4);
  });
});
