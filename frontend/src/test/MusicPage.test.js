import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MusicPage from '../pages/musicPage/musicPage';

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
