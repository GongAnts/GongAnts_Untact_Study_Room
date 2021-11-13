import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  SCHEDULE_LOADING_REQUEST,
  SCHEDULE_LOADING_SUCCESS,
  SCHEDULE_LOADING_FAILURE,
  SCHEDULE_WRITE_REQUEST,
  SCHEDULE_WRITE_SUCCESS,
  SCHEDULE_WRITE_FAILURE,
  SCHEDULE_DELETE_REQUEST,
  SCHEDULE_DELETE_SUCCESS,
  SCHEDULE_DELETE_FAILURE,
  SCHEDULE_UPDATE_REQUEST,
  SCHEDULE_UPDATE_SUCCESS,
  SCHEDULE_UPDATE_FAILURE,
} from '../types';

// schedule load
const scheduleloadAPI = (data) => {
  return axios.get('/calendar/load/all', data);
};

function* scheduleload() {
  try {
    const result = yield call(scheduleloadAPI);
    yield put({
      type: SCHEDULE_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SCHEDULE_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchschedule() {
  yield takeEvery(SCHEDULE_LOADING_REQUEST, scheduleload);
}

// schedule create
const scheduleAddAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(data);
  return axios.post('/calendar/write', data, config);
};

function* scheduleAdd(action) {
  try {
    const result = yield call(scheduleAddAPI, action.payload);
    console.log(result.data);

    yield put({
      type: SCHEDULE_WRITE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SCHEDULE_WRITE_FAILURE,
      payload: e,
    });
  }
}

function* watchscheduleAdd() {
  yield takeEvery(SCHEDULE_WRITE_REQUEST, scheduleAdd);
}

// edit
const calendareditAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.post('/calendar/modify', data, config);
};

function* calendaredit(action) {
  try {
    const result = yield call(calendareditAPI, action.payload);

    yield put({
      type: SCHEDULE_UPDATE_SUCCESS,
      payload: result.data,
    });
    yield put(push('/admin/calendar'));
  } catch (e) {
    yield put({
      type: SCHEDULE_UPDATE_FAILURE,
      payload: e,
    });
  }
}

function* watchcalendarEdit() {
  yield takeEvery(SCHEDULE_UPDATE_REQUEST, calendaredit);
}

// schedule delete
const calendardeleteAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.delete(`/calendar/delete?id=${data}`, config);
};

function* calendarDelete(action) {
  try {
    const result = yield call(calendardeleteAPI, action.payload);
    yield put({
      type: SCHEDULE_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SCHEDULE_DELETE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchmemodelete() {
  yield takeEvery(SCHEDULE_DELETE_REQUEST, calendarDelete);
}

export default function* schedulesaga() {
  yield all([
    fork(watchschedule),
    fork(watchscheduleAdd),
    fork(watchcalendarEdit),
    fork(watchmemodelete),
  ]);
}
