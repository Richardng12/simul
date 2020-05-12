import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

const configureStore = () => {
  const observableMiddleware = createEpicMiddleware();

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(observableMiddleware)),
  );
  // const store = createStore(rootReducer);

  observableMiddleware.run(rootEpic);
  return { store };
};

export default configureStore;
