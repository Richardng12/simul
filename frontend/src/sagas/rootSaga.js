import { fork, all } from 'redux-saga/effects';
import profileSaga from './profileSaga';
import musicSaga from './musicSaga';

export default function* rootSaga() {
  yield all([fork(musicSaga), fork(profileSaga)]);
}
