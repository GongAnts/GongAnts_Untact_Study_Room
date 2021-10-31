import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  MEMO_WRITE_REQUEST,
  MEMO_WRITE_SUCCESS,
  MEMO_WRITE_FAILURE,
  MEMO_LIST_REQUEST,
  MEMO_LIST_SUCCESS,
  MEMO_LIST_FAILURE,
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

// memo load
const memoloadAPI = (data) => {
  return axios.post('/memo/load', data);
};

function* memoLoad(action) {
  try {
    const result = yield call(memoloadAPI, action.payload);

    yield put({
      type: MEMO_LIST_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: MEMO_LIST_FAILURE,
      payload: e.response,
    });
  }
}

function* watchmemoLoad(action) {
  yield takeEvery(MEMO_LIST_REQUEST, memoLoad);
}

export default function* memosaga() {
  yield all([fork(watchmemowrite), fork(watchmemoLoad)]);
}
