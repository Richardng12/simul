import { combineReducers } from 'redux';
import musicReducer from './reducers/musicReducer';
import profileReducer from './reducers/profileReducer';

const rootReducer = combineReducers({
  MusicReducer: musicReducer,
  ProfileReducer: profileReducer,
});

export default rootReducer;
