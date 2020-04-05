import { catchError, filter, mergeMap } from 'rxjs/operators';

import { actionTypes } from './profileActions';

const login = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.login),
    mergeMap(async action => {
      await fetch('http://localhost:8888/auth/spotify').then(res => res.json());
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
      const result = await fetch('http://localhost:8888/userinfo', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }).then(res => res.json());

      // todo: remove when using the result
      // eslint-disable-next-line no-console
      console.log(result);
      return { ...action, type: actionTypes.getUserInfo_success, token: 'placeholder' };
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
