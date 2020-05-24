import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import LobbyPage from '../pages/lobbyPage/lobbyPage';
import LobbyTile from '../pages/lobbyPage/LobbyTile';
import AddLobbyModal from '../pages/lobbyPage/addLobbyModal';

const mockStore = configureMockStore();

describe('<LobbyPage />', () => {
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

  it('renders lobby page', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <LobbyPage />
        </Provider>
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders lobby tile', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <LobbyTile />
        </Provider>
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders add lobby modal', () => {
    const component = mount(
      <Provider store={store}>
        <AddLobbyModal open />
      </Provider>,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
