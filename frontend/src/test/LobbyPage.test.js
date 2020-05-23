import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import LobbyPage from '../pages/lobbyPage/lobbyPage';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<MusicPage />', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <LobbyPage />
      </Provider>,
    );
  });
});
