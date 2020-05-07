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

const getSingleLobby = (action$, store) =>
  action$.pipe(
    filter(action => action.type === actionTypes.getSingleLobby),
    mergeMap(async action => {
      const id = store.value.lobbyReducer.lobbyId;
      const lobby = await fetch(`${LOBBY}/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }).then(res => res.json());
      return { ...action, type: actionTypes.getSingleLobby_success, lobby };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.getSingleLobby_fail,
        message: err.message,
      }),
    ),
  );

// eslint-disable-next-line no-unused-vars
const addLobby = (action$, store) =>
  action$.pipe(
    filter(action => action.type === actionTypes.addLobby),
    mergeMap(async action => {
      const name = 'bruh wtf why is this not working';
      const isPublic = false;
      const password = 'password';
      const response = await fetch(LOBBY, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          isPublic,
          password,
        }),
      });
      const create = await response.json();
      console.log(create);
      return { ...action, type: actionTypes.addLobby_success, create };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.getAllLobbies_fail,
        message: err.message,
      }),
    ),
  );
export default getLobbies;

export { addLobby, getSingleLobby };
