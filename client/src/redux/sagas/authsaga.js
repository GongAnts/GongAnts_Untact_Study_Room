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
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
} from 'redux/types';

// signin
const loginUserAPI = (loginData) => {
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('/auth/signin', loginData, config);
};

function* loginUser(loginaction) {
  try {
    const result = yield call(loginUserAPI, loginaction.payload);
    console.log(result);
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
  return axios.post('/auth/signup', registerData, config);
};

function* registerUser(action) {
  try {
    const result = yield call(signUpAPI, action.payload);

    yield put({
      type: REGISTER_SUCCESS,
      payload: result,
    });
    yield put(push(`/auth`));
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

    // yield put(push(`/`));
  } catch (e) {
    console.log('실패');
    console.log(e);
    yield put({
      type: LOGOUT_FAILURE,
      payload: e,
    });
  }
}
function* watchlogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

// User Loading
const userLoadingAPI = (token) => {
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.get('/auth', config);
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);
    console.log(result.data);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
    console.log('유저 로딩');
  } catch (e) {
    console.log('유저로딩 실패');
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

export default function* authsaga() {
  yield all([
    // User Auth
    fork(watchLoginUser),
    fork(watchregisterUser),
    fork(watchlogout),
    fork(watchuserLoading),
  ]);
}
