import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from 'redux/types';

// signin
const loginUserAPI = (loginData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('signin/onsignin', loginData, config);
};

function* loginUser(loginaction) {
  try {
    const result = yield call(loginUserAPI, loginaction.payload);

    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// signup
const signUpAPI = (registerData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.post('signin/onsignup', registerData, config);
};

function* registerUser(action) {
  try {
    console.log(action);
    const result = yield call(signUpAPI, action.payload);

    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// Logout
function* logout() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });

    yield put(push(`/`));
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}
function* watchlogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

export default function* authSaga() {
  yield all([
    // User Auth
    fork(watchLoginUser),
    fork(watchregisterUser),
    fork(watchlogout),
  ]);
}
