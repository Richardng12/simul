import { catchError, filter, mergeMap } from 'rxjs/operators';
import { USER_INFO, SPOTIFY_AUTH } from '../../config/config';
import { actionTypes } from './profileActions';

const login = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.login),
    mergeMap(async action => {
      await fetch(SPOTIFY_AUTH).then(res => res.json());
      return { ...action, type: actionTypes.login_success, token: 'placeholder' };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.login_fail,
        message: err.message,
      }),
    ),
  );

const getUserInfo = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.getUserInfo),
    mergeMap(async action => {
      const user = await fetch(USER_INFO, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }).then(res => res.json());
      // const userId = await fetch(USER, {
      //   method: 'GET',
      //   mode: 'cors',
      //   credentials: 'include',
      // })
      // .then(res => res.json())
      // .then(res => res._id);
      return { ...action, type: actionTypes.getUserInfo_success, user };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.getUserInfo_fail,
        message: err.message,
      }),
    ),
  );

export default login;
export { getUserInfo };
