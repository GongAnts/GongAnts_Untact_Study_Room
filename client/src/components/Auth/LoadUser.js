import store from 'store';
import { USER_LOADING_REQUEST } from 'redux/types';

function LoadUser() {
  try {
    store.dispatch({
      type: USER_LOADING_REQUEST,
    });
  } catch (e) {
    console.log(e);
  }
}

export default LoadUser;