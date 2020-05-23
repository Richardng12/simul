import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import MusicPage from '../pages/musicPage/musicPage';
import AppBar from '../pages/musicPage/components/appBar';

const mockStore = configureMockStore();

describe('<MusicPage />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      profileReducer: {
        user: {},
        loading: false,
        isAuthenticated: false,
        message: '',
      },
    });
  });
  it('renders without crashing', () => {
    const component = shallow(
      <Provider store={store}>
        <MusicPage />
      </Provider>,
    );
    expect(component).toBeTruthy();
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
});
