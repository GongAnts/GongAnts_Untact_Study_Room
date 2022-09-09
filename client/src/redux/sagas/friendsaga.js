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
} from '../types';

// friends search
const friendsearchAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.get(`/friend/search?email=${data.email}`, config);
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

export default function* friendsaga() {
  yield all([fork(watchsearchfriends)]);
}
