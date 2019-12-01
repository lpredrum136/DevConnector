import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  myAlerts: alertReducer,
  myAuth: authReducer,
  myProfile: profileReducer
});

export default rootReducer;
