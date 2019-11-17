import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  myAlerts: alertReducer,
  myAuth: authReducer
});

export default rootReducer;
