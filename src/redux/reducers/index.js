import { combineReducers } from 'redux';
import authreducer from 'redux/reducers/authreducer';
import memoreducer from './memoreducer';
import schedule from './modules/calendar';

const rootReducer = combineReducers({
  auth: authreducer,
  memo: memoreducer,
  schedule: schedule,
});

export default rootReducer;
