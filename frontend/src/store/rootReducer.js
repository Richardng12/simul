import { combineReducers } from 'redux';
import musicReducer from './music/musicReducer';
import profileReducer from './profile/profileReducer';
import chatReducer from './chat/chatReducer';

const rootReducer = combineReducers({
  musicReducer,
  profileReducer,
  chatReducer,
});

export default rootReducer;
