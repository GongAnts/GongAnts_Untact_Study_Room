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
  USER_LOADING_FAILURE
} from 'redux/types';

// signin
const loginUserAPI = (loginData) => {
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(loginData);

  return axios.post('/signin', loginData, config);
};

function* loginUser(loginaction) {
  try {
    const result = yield call(loginUserAPI, loginaction.payload);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
    yield push('/admin/dashboard');
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
  return axios.post('/signup', registerData, config);
};

function* registerUser(action) {
  try {
    const result = yield call(signUpAPI, action.payload);

    yield put({
      type: REGISTER_SUCCESS,
      payload: result,
    });
  } catch (e) {
    alert(`${e.response.data.msg}`);

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

// User Loading
const userLoadingAPI = (token) => {
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.get('/', config);
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);
    console.log(result);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
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
