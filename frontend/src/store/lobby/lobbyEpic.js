import { catchError, filter, mergeMap } from 'rxjs/operators';
import { actionTypes } from './lobbyActions';
import { LOBBY } from '../../config/config';

const getLobbies = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.getAllLobbies),
    mergeMap(async action => {
      const lobbies = await fetch(LOBBY, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }).then(res => res.json());
      return { ...action, type: actionTypes.getAllLobbies_success, lobbies };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.getAllLobbies_fail,
        message: err.message,
      }),
    ),
  );

export default getLobbies;
