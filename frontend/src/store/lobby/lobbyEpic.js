import { catchError, filter, mergeMap } from 'rxjs/operators';
import { actionTypes } from './lobbyActions';
import { LOBBY } from '../../config/config';
import socket from '../../socket';
import { addToCurrentQueue } from '../../pages/musicPage/components/musicPlayer/musicPlayerService';

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
      const response = await fetch(`${LOBBY}/${id}/songs`, {
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
      });

      const queue = await response.json();
      socket.emit('removeFromQueue', id);

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

const getCurrentSong = (action$, store) =>
  action$.pipe(
    filter(action => action.type === actionTypes.getCurrentSong),
    mergeMap(async action => {
      const id = store.value.lobbyReducer.lobbyId;
      const currentSong = await fetch(`${LOBBY}/${id}/songs/current`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }).then(res => res.json());
      return { ...action, type: actionTypes.getCurrentSong_success, currentSong };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.getCurrentSong_fail,
        message: err.message,
      }),
    ),
  );

const getTimeStampDifferential = (action$, store) =>
  action$.pipe(
    filter(action => action.type === actionTypes.getTimeStampDifferential),
    mergeMap(async action => {
      const id = store.value.lobbyReducer.lobbyId;
      const timeStampDifferential = await fetch(`${LOBBY}/${id}/songs/timestamp`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }).then(res => res.json());
      return {
        ...action,
        type: actionTypes.getTimeStampDifferential_success,
        timeStampDifferential,
      };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.getTimeStampDifferential_fail,
        message: err.message,
      }),
    ),
  );

const setSongTimeStamp = (action$, store) =>
  action$.pipe(
    filter(action => action.type === actionTypes.setSongTimeStamp),
    mergeMap(async action => {
      const id = store.value.lobbyReducer.lobbyId;
      const timestamp = await fetch(`${LOBBY}/${id}/songs/timestamp`, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
      }).then(res => res.json());
      return { ...action, type: actionTypes.setSongTimeStamp_success, timestamp };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.setSongTimeStamp_fail,
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

      const { accessToken } = store.value.profileReducer.user;
      const deviceId = store.value.musicReducer.currentDevice;
      const spotifyURI = `spotify:track:${spotifySongId}`;
      // console.log(spotifySongId);
      await addToCurrentQueue(accessToken, deviceId, spotifyURI);
      socket.emit('addToQueue', id);
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
  getCurrentSong,
  setSongTimeStamp,
  getTimeStampDifferential,
};
