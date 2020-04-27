import { catchError, filter, mergeMap } from 'rxjs/operators';
import { CHAT_SERVER } from '../../config/config';
import { actionTypes } from './chatActions';

// get all chats from db by calling our backend endpoint
const getChats = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.getChats),
    mergeMap(async action => {
      const chats = await fetch(CHAT_SERVER, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }).then(res => res.json());
      return { ...action, type: actionTypes.getChats_success, chats };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.getChats_fail,
        message: err.message,
      }),
    ),
  );

export default getChats;
