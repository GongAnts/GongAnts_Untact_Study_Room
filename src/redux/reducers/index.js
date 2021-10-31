import { combineReducers } from 'redux';
import authreducer from 'redux/reducers/authreducer';
import schedule from './modules/calendar';

const rootReducer = combineReducers({
  auth: authreducer,
  schedule: schedule,
});

export default rootReducer;
