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
  MEMO_EDIT_REQUEST,
  MEMO_EDIT_SUCCESS,
  MEMO_EDIT_FAILURE,
  MEMO_UPDATE_REQUEST,
  MEMO_UPDATE_SUCCESS,
  MEMO_UPDATE_FAILURE,
  MEMO_DELETE_REQUEST,
  MEMO_DELETE_SUCCESS,
  MEMO_DELETE_FAILURE,
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
  return axios.get('/memo/load', data);
};

function* memoLoad() {
  try {
    const result = yield call(memoloadAPI);
    yield put({
      type: MEMO_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: MEMO_LIST_FAILURE,
      payload: e.response,
    });
  }
}

function* watchmemoLoad() {
  yield takeEvery(MEMO_LIST_REQUEST, memoLoad);
}

// memo editpage
const memoeditAPI = (data) => {
  return axios.get(`/memo/detail?id=${data}`, data);
};

function* memoedit(action) {
  try {
    const result = yield call(memoeditAPI, action.payload);
    console.log(result);
    yield put({
      type: MEMO_EDIT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: MEMO_EDIT_FAILURE,
      payload: e.response,
    });
  }
}

function* watchmemoedit() {
  yield takeEvery(MEMO_EDIT_REQUEST, memoedit);
}

// memo update //
const memoupdateAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.post('/memo/modify', data, config);
};

function* memoupdate(action) {
  try {
    const result = yield call(memoupdateAPI, action.payload);

    yield put({
      type: MEMO_UPDATE_SUCCESS,
      payload: result.data,
    });
    yield put(push('/admin/memo'));
  } catch (e) {
    yield put({
      type: MEMO_UPDATE_FAILURE,
      payload: ejs,
    });
  }
}

function* watchmemoupdate() {
  yield takeEvery(MEMO_UPDATE_REQUEST, memoupdate);
}

// memo delete //
const memodeleteAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.delete(`memo/delete?id=${data}`, config);
};

function* memoDelete(action) {
  try {
    const result = yield call(memodeleteAPI, action.payload);
    yield put({
      type: MEMO_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: MEMO_DELETE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchmemodelete() {
  yield takeEvery(MEMO_DELETE_REQUEST, memoDelete);
}

export default function* memosaga() {
  yield all([
    fork(watchmemowrite),
    fork(watchmemoLoad),
    fork(watchmemoedit),
    fork(watchmemoupdate),
    fork(watchmemodelete),
  ]);
}
