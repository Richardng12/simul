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
      const queue = await fetch(`${LOBBY}/${id}/songs`, {
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
      return { ...action, type: actionTypes.removeSongFromQueue_success, queue };
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

const setLobbyQueue = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.setLobbyQueue),
    mergeMap(async action => {
      const { id } = action;
      const response = await fetch(`${LOBBY}/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      const lobby = await response.json();
      const queue = lobby.songs;
      return { ...action, type: actionTypes.addSongToQueue_success, queue };
    }),
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
      if (response.status === 202) {
        return { ...action, type: actionTypes.addLobby_fail };
      }
      const newLobby = await response.json();
      return { ...action, type: actionTypes.addLobby_success, newLobby };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.getAllLobbies_fail,
        message: err.message,
      }),
    ),
  );

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

const deleteLobby = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.deleteLobby),
    mergeMap(async action => {
      const { lobbyId } = action;
      const response = await fetch(`${LOBBY}/${lobbyId}`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
      });
      const lobbies = await response.json();
      console.log(lobbies);
      return { ...action, type: actionTypes.deleteLobby_success, lobbies };
    }),
  );

export default getLobbies;

export {
  addLobby,
  getSingleLobby,
  addSongToQueue,
  removeSongFromQueue,
  setUsers,
  deleteLobby,
  setLobbyQueue,
};
