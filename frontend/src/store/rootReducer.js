import { combineReducers } from 'redux';
import musicReducer from './music/musicReducer';
import profileReducer from './profile/profileReducer';

const rootReducer = combineReducers({
  MusicReducer: musicReducer,
  ProfileReducer: profileReducer,
});

export default rootReducer;
