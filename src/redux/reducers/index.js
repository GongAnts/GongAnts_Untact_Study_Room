import { combineReducers } from 'redux';
import authReducer from './authreducer';
import schedule from './modules/calendar';

const rootReducer = combineReducers({
  auth: authReducer,
  schedule,
});

export default rootReducer;
