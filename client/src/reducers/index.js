import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  myAlerts: alertReducer,
  myAuth: authReducer,
  myProfile: profileReducer,
  myPost: postReducer
});

export default rootReducer;
