import { catchError, filter, mergeMap } from 'rxjs/operators';
import { CHAT_SERVER } from '../../config/config';
import { actionTypes } from './chatActions';

// get all chats from db by calling our backend endpoint
const getChats = action$ =>
  action$.pipe(
    filter(action => action.type === actionTypes.getChats),
    mergeMap(async action => {
      const { lobbyId } = action;
      const chats = await fetch(`${CHAT_SERVER}/${lobbyId}`, {
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

// const afterPostMessage = (action$, store) =>
//   action$.pipe(
//     filter(action => action.type === actionTypes.afterPostMessage),
//     mergeMap(async action => {
//       const { data } = action;
//       const id = store.value.lobbyReducer.lobbyId;
//       const response = await fetch(`http://localhost:8888/afterPostMessage/${id}`, {
//         method: 'PATCH',
//         mode: 'cors',
//         credentials: 'include',
//         headers: {
//           Accept: 'application/json, text/plain, */*',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           data,
//         }),
//       });
//       const addedData = await response.json();
//       console.log(addedData);
//       return { ...action, type: actionTypes.afterPostMessage_success, addedData };
//     }),
//     catchError(err =>
//       Promise.resolve({
//         type: actionTypes.afterPostMessage_fail,
//         message: err.message,
//       }),
//     ),
//   );

export default getChats;
// export { getChats, afterPostMessage };
