import { combineReducers } from 'redux';
import musicReducer from './music/musicReducer';
import profileReducer from './profile/profileReducer';
import lobbyReducer from './lobby/lobbyReducer';
import chatReducer from './chat/chatReducer';

const rootReducer = combineReducers({
  musicReducer,
  profileReducer,
  lobbyReducer,
  chatReducer,
});

export default rootReducer;
