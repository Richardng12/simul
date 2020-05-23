import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import MusicPage from '../pages/musicPage/musicPage';
import AppBar from '../pages/musicPage/components/appBar';
import LyricsContainer from '../pages/musicPage/lyricsContainer';
import SongSearch from '../pages/musicPage/components/songSearch';
import SongQueueTable from '../pages/musicPage/components/songQueueTable';
import MembersList from '../pages/musicPage/components/membersList';
import './__mocks__/matchMedia.mock';
// import ChatPage from '../pages/musicPage/components/chatPage';

const mockStore = configureMockStore();

describe('<MusicPage />', () => {
  let store;
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        };
      }),
    });
  });
  beforeEach(() => {
    store = mockStore({
      profileReducer: {
        user: {},
        loading: false,
        isAuthenticated: false,
        message: '',
      },
      chatReducer: {
        chats: [
          { _id: '', message: '', sender: {}, lobbyId: {}, type: '', createdAt: '', updatedAt: '' },
        ],
        loading: false,
      },
      musicReducer: {
        currentSong: null,
        currentDevice: null,
      },
      lobbyReducer: {
        lobbies: [],
        loading: false,
        currentLobby: null,
        lobbyId: '',
        users: [],
        currentQueue: [],
      },
    });
  });
  it('renders without crashing', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <MusicPage />
        </Provider>
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders app bar', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <AppBar />
        </Provider>
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders lyrics container', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <LyricsContainer />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders song search', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <SongSearch />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders song queue table', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <SongQueueTable />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders members list', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MembersList />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  // it('renders chat', () => {
  //   const tree = renderer.create(
  //     <Provider store={store}>
  //       <ChatPage />
  //     </Provider>,
  //   );
  //   expect(tree).toMatchSnapshot();
  // });
});
