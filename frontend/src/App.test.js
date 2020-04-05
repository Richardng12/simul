import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/store';

test('renders learn react link', () => {
  const { store } = configureStore();
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
