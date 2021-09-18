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

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  user: '',
  userId: '',
  userName: '',
  userRole: '',
  errorMsg: '',
  successMsg: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
  }
};

export default authReducer;
