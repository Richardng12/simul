import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import LobbyPage from '../pages/lobbyPage/lobbyPage';

const mockStore = configureMockStore();

describe('<LandingPage />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      lobbyReducer: {
        lobbies: [],
        loading: false,
        currentLobby: null,
        lobbyId: '',
        users: [],
        currentQueue: [],
      },
      profileReducer: {
        user: {},
        loading: false,
        isAuthenticated: false,
        message: '',
      },
    });
  });

  it('render landing page', () => {
    const tree = shallow(
      <MemoryRouter>
        <Provider store={store}>
          <LobbyPage />
        </Provider>
      </MemoryRouter>,
    ).dive();
    expect(tree).toMatchSnapshot();
  });
});
