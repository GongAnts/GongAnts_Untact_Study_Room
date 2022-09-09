import { all, fork } from 'redux-saga/effects';

import dotenv from 'dotenv';
import authsaga from './authsaga';
import schedulesaga from './schedulesaga';
import todosaga from './todosaga';
import friendsaga from './friendsaga';

export default function* rootSaga() {
  yield all([
    fork(authsaga),
    fork(schedulesaga),
    fork(todosaga),
    fork(friendsaga),
  ]);
}
