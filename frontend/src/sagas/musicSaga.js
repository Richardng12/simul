import { call, takeLatest } from 'redux-saga/effects';
import { UpdateUsername } from '../actions/actionTypes';
import { getCurrentSong } from '../services/musicService';

function* getCurrentSongSaga() {
  yield call(getCurrentSong);
}

export default function* profileSaga() {
  yield takeLatest(UpdateUsername, getCurrentSongSaga);
}
