import { catchError, filter, mergeMap } from 'rxjs/operators';

import { actionTypes } from './profileActions';

const login = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.login),
    mergeMap(async action => {
      await fetch('http://localhost:8888/auth/spotify').then(res => console.log(res));
      return { ...action, type: actionTypes.login_success, token: 'placeholder' };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.login_fail,
        message: err.message,
      }),
    ),
  );

export default login;
