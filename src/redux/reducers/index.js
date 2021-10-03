import { combineReducers } from 'redux';
import authReducer from 'redux/reducers/authReducer';
import schedule from './modules/calendar';

const rootReducer = combineReducers({
  auth: authReducer,
  schedule,
});

export default rootReducer;
