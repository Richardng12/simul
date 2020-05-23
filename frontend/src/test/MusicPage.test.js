import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MusicPage from '../pages/musicPage/musicPage';
import AppBar from '../pages/musicPage/components/appBar';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<MusicPage />', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <MusicPage />
      </Provider>,
    );
  });
});

describe('<AppBar />', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <AppBar />
      </Provider>,
    );
  });
});
