import { call, takeLatest } from 'redux-saga/effects';
import { UpdateUsername } from '../actions/actionTypes';
import { getUsername } from '../services/profileService';

function* getUsernameSaga() {
  yield call(getUsername);
}

export default function* profileSaga() {
  yield takeLatest(UpdateUsername, getUsernameSaga);
}
