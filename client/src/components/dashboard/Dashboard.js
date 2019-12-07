import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

/* const Dashboard = ({ myAuth }) => {
  if (!myAuth.isAuthenticated) return <Redirect to='/login' />;
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  myAuth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ myAuth: state.myAuth });

export default connect(mapStateToProps)(Dashboard);
 */

const Dashboard = ({ myAuth, myProfile, getCurrentProfile, deleteAccount }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return myProfile.loading && myProfile.profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome{' '}
        {myAuth.user && myAuth.user.name}
      </p>
      {myProfile.profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience myExperience={myProfile.profile.experience} />
          <Education myEducation={myProfile.profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-slash'></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  myAuth: PropTypes.object.isRequired,
  myProfile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  myAuth: state.myAuth,
  myProfile: state.myProfile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
