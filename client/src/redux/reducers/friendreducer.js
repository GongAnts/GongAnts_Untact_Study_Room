import {
  FRIENDS_SEARCH_REQUEST,
  FRIENDS_SEARCH_SUCCESS,
  FRIENDS_SEARCH_FAILURE,
  FRIENDS_LIST_REQUEST,
  FRIENDS_LIST_SUCCESS,
  FRIENDS_LIST_FAILURE,
} from 'redux/types';

const initialState = {
  friendsSearch: [],
  friendsList: [],
  friendState: Boolean,
};

const friendreducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIENDS_SEARCH_REQUEST:
      return {
        friendsSearch: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default friendreducer;
