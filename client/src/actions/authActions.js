import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import { setAlert } from './alertActions';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

// Load user
export const loadUser = () => {
  const dispatchLoadUser = async dispatch => {
    // Check localStorage for token
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
  return dispatchLoadUser;
};

// Register User
export const registerUser = userData => {
  const dispatchRegisterUser = async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = {
      name: userData.name,
      email: userData.email,
      password: userData.password
    };

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors)
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: REGISTER_FAIL
      });
    }
  };

  return dispatchRegisterUser;
};

// Login user
export const loginUser = userData => {
  const dispatchLoginUser = async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', userData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors)
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
  return dispatchLoginUser;
};

// Logout / Clear Profile
export const logout = () => {
  const dispatchLogout = dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
  };

  return dispatchLogout;
};
