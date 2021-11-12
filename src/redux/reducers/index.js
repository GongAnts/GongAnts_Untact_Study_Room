import { combineReducers } from 'redux';
import authreducer from 'redux/reducers/authreducer';
import memoreducer from './memoreducer';
import schedulereducer from './schedulereducer';

const rootReducer = combineReducers({
  auth: authreducer,
  memo: memoreducer,
  schedule: schedulereducer,
});

export default rootReducer;
