import { catchError, filter, mergeMap } from 'rxjs/operators';
import { FILE_SERVER } from '../../config/config';
import { actionTypes } from './chatActions';

// not used
const postFile = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.postFile),
    mergeMap(async action => {
      const file = await fetch(FILE_SERVER, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        header: { 'content-type': 'multipart/form-data' },
      }).then(res => res.json());
      return { ...action, type: actionTypes.postFile_success, file };
    }),
    catchError(err =>
      Promise.resolve({
        type: actionTypes.file_fail,
        message: err.message,
      }),
    ),
  );

export default postFile;
