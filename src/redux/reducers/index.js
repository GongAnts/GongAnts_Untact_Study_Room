import { combineReducers } from 'redux';
<<<<<<< HEAD
import authreducer from 'redux/reducers/authreducer';
=======
import authReducer from './authreducer';
>>>>>>> 60af98e6be3776efd75929676dd442ba9a44b3ef
import schedule from './modules/calendar';

const rootReducer = combineReducers({
  auth: authreducer,
  schedule,
});

export default rootReducer;
