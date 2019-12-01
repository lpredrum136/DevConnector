import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, myAuth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !myAuth.isAuthenticated && !myAuth.loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);
PrivateRoute.propTypes = {
  myAuth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  myAuth: state.myAuth
});

export default connect(mapStateToProps)(PrivateRoute);
