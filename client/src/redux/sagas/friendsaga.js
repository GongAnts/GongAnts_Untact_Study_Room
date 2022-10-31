import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  FRIENDS_SEARCH_REQUEST,
  FRIENDS_SEARCH_SUCCESS,
  FRIENDS_SEARCH_FAILURE,
  FRIENDS_LIST_REQUEST,
  FRIENDS_LIST_SUCCESS,
  FRIENDS_LIST_FAILURE,
  FRIENDS_SEND_REQUEST,
  FRIENDS_SEND_SUCCESS,
  FRIENDS_SEND_FAILURE,
  FRIENDS_RQLIST_REQUEST,
  FRIENDS_RQLIST_SUCCESS,
  FRIENDS_RQLIST_FAILURE,
  FRIENDS_DELETE_REQUEST,
  FRIENDS_DELETE_SUCCESS,
  FRIENDS_DELETE_FAILURE,
  FRIENDS_PROCESS_REQUEST,
  FRIENDS_PROCESS_SUCCESS,
  FRIENDS_PROCESS_FAILURE,
} from '../types';

// friends search
const friendsearchAPI = (email) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.get(`/friend/search?email=${email}`, config);
};

function* friendsearch(action) {
  try {
    const result = yield call(friendsearchAPI, action.payload);
    yield put({
      type: FRIENDS_SEARCH_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: FRIENDS_SEARCH_FAILURE,
      payload: e.response,
    });
  }
}

function* watchsearchfriends() {
  yield takeEvery(FRIENDS_SEARCH_REQUEST, friendsearch);
}

// friends 요청보내기
const friendSendAPI = (body) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.post(`/friend/request?email=${body.email}`, body, config);
};

function* friendSend(action) {
  try {
    const result = yield call(friendSendAPI, action.payload);

    yield put({
      type: FRIENDS_SEND_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: FRIENDS_SEND_FAILURE,
      payload: e.response,
    });
  }
}

function* watchsendfriends() {
  yield takeEvery(FRIENDS_SEND_REQUEST, friendSend);
}

// friends 요청 리스트 불러오기
const friendRQlistAPI = (body) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.get(`/friend/request`, body, config);
};

function* friendRQlist(action) {
  try {
    const result = yield call(friendRQlistAPI, action.payload);
    console.log(result.data);
    yield put({
      type: FRIENDS_RQLIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: FRIENDS_RQLIST_FAILURE,
      payload: e.response,
    });
  }
}

function* watchRQlistfriends() {
  yield takeEvery(FRIENDS_RQLIST_REQUEST, friendRQlist);
}

// friends List
const friendlistAPI = () => {
  return axios.get('/friend/list');
};

function* friendlist(action) {
  try {
    const result = yield call(friendlistAPI, action.payload);
    yield put({
      type: FRIENDS_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: FRIENDS_LIST_FAILURE,
      payload: e.response,
    });
  }
}

function* watchlistfriends() {
  yield takeEvery(FRIENDS_LIST_REQUEST, friendlist);
}

// friends delete
const friendsdeleteAPI = (data) => {
  return axios.delete(`/friend?email=${data.email}`);
};

function* friendsDelete(action) {
  try {
    const result = yield call(friendsdeleteAPI, action.payload);
    yield put({
      type: FRIENDS_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: FRIENDS_DELETE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchfreindsdelete() {
  yield takeEvery(FRIENDS_DELETE_REQUEST, friendsDelete);
}

// friends 요청 처리
const friendsRequestAPI = (data) => {
  return axios.put(`/friend?email=${data.email}&state=${data.state}`);
};

function* friendsRequest(action) {
  try {
    const result = yield call(friendsRequestAPI, action.payload);
    yield put({
      type: FRIENDS_PROCESS_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: FRIENDS_PROCESS_FAILURE,
      payload: e.response,
    });
  }
}

function* watchfreindsRequest() {
  yield takeEvery(FRIENDS_PROCESS_REQUEST, friendsRequest);
}

export default function* friendsaga() {
  yield all([
    fork(watchsearchfriends),
    fork(watchsendfriends),
    fork(watchRQlistfriends),
    fork(watchlistfriends),
    fork(watchfreindsdelete),
    fork(watchfreindsRequest),
  ]);
}
