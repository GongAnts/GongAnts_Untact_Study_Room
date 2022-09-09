import { combineReducers } from 'redux';
import authreducer from 'redux/reducers/authreducer';
import schedulereducer from './schedulereducer';
import todoreducer from './todoreducer';
import friendreducer from './friendreducer';

const rootReducer = combineReducers({
  auth: authreducer,
  schedule: schedulereducer,
  todo: todoreducer,
  friend: friendreducer,
});

export default rootReducer;
