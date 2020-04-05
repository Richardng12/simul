import { combineReducers } from 'redux';
import musicReducer from './music/musicReducer';
import profileReducer from './profile/profileReducer';

const rootReducer = combineReducers({
  musicReducer,
  profileReducer,
});

export default rootReducer;
