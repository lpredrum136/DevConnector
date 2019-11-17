import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

const Login = ({ myAuth, loginUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChangeData = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const onFormSubmit = event => {
    event.preventDefault();

    loginUser(formData);
  };

  // Redirect if logged in
  if (myAuth.isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form className='form' onSubmit={onFormSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChangeData}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChangeData}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  myAuth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ myAuth: state.myAuth });

export default connect(mapStateToProps, { loginUser })(Login);
