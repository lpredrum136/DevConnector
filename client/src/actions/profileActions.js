import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS
} from './types';

// Get current users profile
export const getCurrentProfile = () => {
  const dispatchGetCurrentProfile = async dispatch => {
    try {
      const res = await axios.get('/api/profile/me');

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (error) {
      dispatch({ type: CLEAR_PROFILE });
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
  return dispatchGetCurrentProfile;
};

// Get all profiles
export const getProfiles = () => {
  const dispatchGetProfiles = async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
      const res = await axios.get('/api/profile');

      dispatch({ type: GET_PROFILES, payload: res.data });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchGetProfiles;
};

// Get profile by id
export const getProfileById = userId => {
  const dispatchGetProfileById = async dispatch => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      dispatch(setAlert(error.response.data.msg, 'danger'));

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchGetProfileById;
};

// Get GitHub repo
export const getGitHubRepos = username => {
  const dispatchGetGitHubRepos = async dispatch => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);

      dispatch({ type: GET_REPOS, payload: res.data });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchGetGitHubRepos;
};

// Create or update profile
export const createProfile = (userData, history, edit = false) => {
  // edit params to check if create or update profile
  const dispatchCreateProfile = async dispatch => {
    /* const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }; */

    try {
      const res = await axios.post('/api/profile', userData);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      // If editing, not redirect, stay on the page instead
      if (!edit) history.push('/dashboard');
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors)
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
  return dispatchCreateProfile;
};

// Add Experience
export const addExperience = (formData, history) => {
  const dispatchAddExperience = async dispatch => {
    try {
      const res = await axios.put('/api/profile/experience', formData);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Experience Added', 'success'));

      history.push('/dashboard');
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors)
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchAddExperience;
};

// Add Education
export const addEducation = (formData, history) => {
  const dispatchAddEducation = async dispatch => {
    try {
      const res = await axios.put('/api/profile/education', formData);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Education Added', 'success'));

      history.push('/dashboard');
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors)
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchAddEducation;
};

// Delete experience
export const deleteExperience = id => {
  const dispatchDeleteExperience = async dispatch => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Experience Removed', 'success'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchDeleteExperience;
};

// Delete education
export const deleteEducation = id => {
  const dispatchDeleteEducation = async dispatch => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Education Removed', 'success'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchDeleteEducation;
};

// Delete account and profile
export const deleteAccount = () => {
  const dispatchDeleteAccount = async dispatch => {
    if (window.confirm('Are you sure? This action cannot be reverted.')) {
      try {
        await axios.delete('/api/profile');

        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
        dispatch(setAlert('Your account has been removed permanently'));
      } catch (error) {
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: error.response.statusText,
            status: error.response.status
          }
        });
      }
    }
  };

  return dispatchDeleteAccount;
};
