import { combineReducers } from 'redux';
import musicReducer from './music/musicReducer';
import profileReducer from './profile/profileReducer';
import lobbyReducer from './lobby/lobbyReducer';

const rootReducer = combineReducers({
  musicReducer,
  profileReducer,
  lobbyReducer,
});

export default rootReducer;
