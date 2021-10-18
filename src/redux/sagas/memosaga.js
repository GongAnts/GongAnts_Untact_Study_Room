import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  MEMO_WRITE_REQUEST,
  MEMO_WRITE_SUCCESS,
  MEMO_WRITE_FAILURE,
} from 'redux/types';

// memowrite
const memowriteAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.post('/memo/write', data, config);
};

function* memoWrite(action) {
  try {
    const result = yield call(memowriteAPI, action.payload);
    console.log(result);

    yield put({
      type: MEMO_WRITE_SUCCESS,
      payload: result,
    });
  } catch (e) {
    alert(`${e.response.data.msg}`);

    yield put({
      type: MEMO_WRITE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchmemowrite() {
  yield takeEvery(MEMO_WRITE_REQUEST, memoWrite);
}

export default function* memosaga() {
  yield all([fork(watchmemowrite)]);
}
