import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import dotenv from 'dotenv';
import authsaga from './authsaga';
import memosaga from './memosaga';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  yield all([fork(authsaga), fork(memosaga)]);
}
