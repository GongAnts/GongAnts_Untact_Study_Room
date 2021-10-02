import { combineReducers } from 'redux';
import authReducer from './authReducer';
import schedule from './modules/calendar';

const rootReducer = combineReducers({
  auth: authReducer,
  schedule,
});

export default rootReducer;
