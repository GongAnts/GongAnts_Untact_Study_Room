import {
  TODO_LOAD_REQUEST,
  TODO_LOAD_SUCCESS,
  TODO_TODAY_SUCCESS,
  TODO_TODAY_FAILURE,
  TODO_WRITE_REQUEST,
  TODO_WRITE_SUCCESS,
  TODO_WRITE_FAILURE,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_DELETE_FAILURE,
  TODO_UPDATE,
  TODO_CHECK,
  TODO_CHECK_SUCCESS,
} from 'redux/types';

const initialState = {
  fullTodo: [],
  todoReady: [],
  todoFinish: [],
  todoToday: [],
};

const todoreducer = (state = initialState, action) => {
  switch (action.type) {
    case TODO_LOAD_REQUEST:
      return {
        ...state,
      };
    case TODO_LOAD_SUCCESS:
      return {
        ...state,
        fullTodo: action.payload,
      };
    case TODO_CHECK_SUCCESS:
      return {
        ...state,
        fullTodo: [fullTodo, action.payload],
      };
    case TODO_TODAY_SUCCESS:
      return {
        ...state,
        todoToday: action.payload.reverse(),
      };
    default:
      return {
        ...state,
      };
  }
};

export default todoreducer;
