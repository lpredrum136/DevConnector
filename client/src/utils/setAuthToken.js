/*export const tokenConfig = getState => {
  // Get token from localStorage
  const token = getState().myAuth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) config.headers['x-auth-token'] = token;

  return config;
};*/

import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
