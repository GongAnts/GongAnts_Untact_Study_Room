import { combineReducers } from 'redux';
import authreducer from 'redux/reducers/authreducer';
import memoreducer from './memoreducer';
import schedulereducer from './schedulereducer';
import todoreducer from './todoreducer';

const rootReducer = combineReducers({
  auth: authreducer,
  memo: memoreducer,
  schedule: schedulereducer,
  todo: todoreducer,
});

export default rootReducer;
