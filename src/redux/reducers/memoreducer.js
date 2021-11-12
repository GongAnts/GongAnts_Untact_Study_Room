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

const initialState = {
  memo: [],
  isLoading: false,
  memo_title: '',
  memo_content: '',
};

const memoreducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMO_WRITE_REQUEST:
    case MEMO_EDIT_REQUEST:
    case MEMO_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MEMO_UPDATE_SUCCESS:
    case MEMO_WRITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case MEMO_LIST_REQUEST:
      return {
        ...state,
      };
    case MEMO_LIST_SUCCESS:
      return {
        ...state,
        memo: action.payload,
      };
    case MEMO_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        memo_title: action.payload.memo_title,
        memo_content: action.payload.memo_content,
      };
    default:
      return state;
  }
};

export default memoreducer;
