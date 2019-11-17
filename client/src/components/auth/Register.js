import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alertActions';
import { registerUser } from '../../actions/authActions';

const Register = ({ myAuth, setAlert, registerUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChangeData = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onFormSubmit = async event => {
    event.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser(formData);
    }
  };

  // Redirect if register successful
  if (myAuth.isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={onFormSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChangeData}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChangeData}
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChangeData}
            minLength='6'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChangeData}
            minLength='6'
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  myAlerts: PropTypes.array.isRequired,
  myAuth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  myAlerts: state.myAlerts,
  myAuth: state.myAuth
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
