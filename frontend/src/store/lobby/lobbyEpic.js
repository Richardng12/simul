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

const removeSongFromQueue = (action$, store) =>
  action$.pipe(
    filter(action => action.type === actionTypes.removeSongFromQueue),
    mergeMap(async action => {
      const id = store.value.lobbyReducer.lobbyId;
      const { songId } = action;
      await fetch(`${LOBBY}/${id}/songs`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: songId,
        }),
      }).then(res => res.json());
      return { ...action, type: actionTypes.removeSongFromQueue_success };
    }),
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

const addSongToQueue = (action$, store) =>
  action$.pipe(
    filter(action => action.type === actionTypes.addSongToQueue),
    mergeMap(async action => {
      const { spotifySongId } = action;
      const id = store.value.lobbyReducer.lobbyId;
      const response = await fetch(`${LOBBY}/${id}/songs`, {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spotifySongId,
        }),
      });
      const queue = await response.json();
      return { ...action, type: actionTypes.addSongToQueue_success, queue };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.getAllLobbies_fail,
        message: err.message,
      }),
    ),
  );

const addLobby = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.addLobby),
    mergeMap(async action => {
      const { name, isPublic, password } = action;
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

const setUsers = (action$, store) =>
  action$.pipe(
    filter(action => action.type === actionTypes.setUsersInLobby),
    mergeMap(async action => {
      const id = store.value.lobbyReducer.lobbyId;
      const users = await fetch(`${LOBBY}/${id}/users`, {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
      }).then(res => res.json());
      return { ...action, type: actionTypes.setUsersInLobby_success, users };
    }),
  );

export { addLobby, getSingleLobby, addSongToQueue, removeSongFromQueue, setUsers };
