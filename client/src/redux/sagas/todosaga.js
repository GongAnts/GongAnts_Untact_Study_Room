import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  TODO_LOAD_REQUEST,
  TODO_LOAD_SUCCESS,
  TODO_LOAD_FAILURE,
  TODO_WRITE_REQUEST,
  TODO_WRITE_SUCCESS,
  TODO_WRITE_FAILURE,
  TODO_TODAY_REQUEST,
  TODO_TODAY_SUCCESS,
  TODO_TODAY_FAILURE,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_DELETE_FAILURE,
  TODO_CHECK_REQUEST,
  TODO_CHECK_SUCCESS,
} from 'redux/types';

// todo load //
const todoloadAPI = (data) => {
  return axios.get('/todo/load/all', data);
};

function* todoload() {
  try {
    const result = yield call(todoloadAPI);
    yield put({
      type: TODO_LOAD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: TODO_LOAD_FAILURE,
      payload: e.response,
    });
  }
}

function* watchtodoLoad() {
  yield takeEvery(TODO_LOAD_REQUEST, todoload);
}

// todo today //
const todotodayAPI = () => {
  return axios.get('/todo/today');
};

function* todotoday() {
  try {
    const result = yield call(todotodayAPI);
    console.log(result.data);
    yield put({
      type: TODO_TODAY_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: TODO_TODAY_FAILURE,
      payload: e.response,
    });
  }
}

function* watchtodotoday() {
  yield takeEvery(TODO_TODAY_REQUEST, todotoday);
}

// todo check //
const todocheckAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.put(`/todo/check?id=${data.todo_id}`, config);
};

function* todocheck(action) {
  try {
    const result = yield call(todocheckAPI, action.payload);
    yield put({
      type: TODO_CHECK_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    alert(`${e}`);
  }
}

function* watchtoddocheck() {
  yield takeEvery(TODO_CHECK_REQUEST, todocheck);
}

// todo write //
const todowriteAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.post('/todo', data, config);
};

function* todowrite(action) {
  try {
    const result = yield call(todowriteAPI, action.payload);
    yield put({
      type: TODO_WRITE_SUCCESS,
      payload: result.data,
    });
    window.location.reload(true);
  } catch (e) {
    alert(`${e.response.data.msg}`);

    yield put({
      type: TODO_WRITE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchtodowrite() {
  yield takeEvery(TODO_WRITE_REQUEST, todowrite);
}

// todo delete //
const tododeleteAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.delete(`/todo/delete?id=${data.todo_id}`, config);
};

function* tododelete(action) {
  try {
    const result = yield call(tododeleteAPI, action.payload);
    yield put({
      type: TODO_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: TODO_DELETE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchmemodelete() {
  yield takeEvery(TODO_DELETE_REQUEST, tododelete);
}

export default function* memosaga() {
  yield all([
    fork(watchtodoLoad),
    fork(watchtodotoday),
    fork(watchtodowrite),
    fork(watchmemodelete),
    fork(watchtoddocheck),
  ]);
}
