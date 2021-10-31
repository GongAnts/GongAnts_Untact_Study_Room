import {
  MEMO_WRITE_REQUEST,
  MEMO_WRITE_SUCCESS,
  MEMO_WRITE_FAILURE,
  MEMO_LIST_REQUEST,
  MEMO_LIST_SUCCESS,
  MEMO_LIST_FAILURE,
} from 'redux/types';

const initialState = {
  memo: [],
  isLoading: false,
};

const memoreducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMO_WRITE_REQUEST:
      return {
        ...state,
      };
    case MEMO_WRITE_SUCCESS:
      return {
        ...state,
      };
    case MEMO_LIST_REQUEST:
      return {
        ...state,
      };
    case MEMO_LIST_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default memoreducer;
