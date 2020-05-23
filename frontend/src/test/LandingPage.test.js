import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import LandingPage from '../pages/landingPage/landingPage';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<LandingPage />', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <LandingPage />
      </Provider>,
    );
  });
});
