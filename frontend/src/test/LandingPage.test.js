import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import LandingPage from '../pages/landingPage/landingPage';

const mockStore = configureMockStore();

describe('<LandingPage />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ profileReducer: { loading: false } });
  });

  it('renders without crashing', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <LandingPage />
        </Provider>
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
