import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

const configureStore = () => {
  const observableMiddleware = createEpicMiddleware();

  const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // redux devtools (chrome debug) + redux persist so user object is accessible from all pages
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(observableMiddleware)),
  );
  // const store = createStore(rootReducer);
  const persistor = persistStore(store);
  observableMiddleware.run(rootEpic);
  return { store, persistor };
};

export default configureStore;
