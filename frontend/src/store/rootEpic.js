import { combineEpics } from 'redux-observable';
// import { delay, filter, mapTo } from 'rxjs/operators';
import login, { getUserInfo } from './profile/profileEpic';
import getLobbies from './lobby/lobbyEpic';

// does nothing
// const placeholderEpic = action$ =>
//   action$.pipe(
//     filter(action => action.type === 'placeholder'),
//     delay(1000), // Asynchronously wait 1000ms then continue
//     mapTo({ type: 'placeholder', restaurants: [1, 2] }),
//   );

const rootEpic = combineEpics(login, getUserInfo, getLobbies);

export default rootEpic;
