import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import dotenv from 'dotenv';
import authsaga from './authsaga';
import schedulesaga from './schedulesaga';
import todosaga from './todosaga';

export default function* rootSaga() {
  yield all([fork(authsaga), fork(schedulesaga), fork(todosaga)]);
}
