import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import musicReducer from './reducers/musicReducer';
import profileReducer from './reducers/profileReducer';

const sagaMiddleware = createSagaMiddleWare();

const rootReducer = combineReducers({
  MusicReducer: musicReducer,
  ProfileReducer: profileReducer,
});

function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  return { store, sagaMiddleware };
}

export default configureStore;
