import { combineReducers } from 'redux';
import authreducer from 'redux/reducers/authreducer';
import schedulereducer from './schedulereducer';
import todoreducer from './todoreducer';

const rootReducer = combineReducers({
  auth: authreducer,
  schedule: schedulereducer,
  todo: todoreducer,
});

export default rootReducer;
