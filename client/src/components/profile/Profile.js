import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from '../profile/ProfileTop';
import ProfileAbout from '../profile/ProfileAbout';
import ProfileExperience from '../profile/ProfileExperience';
import ProfileEducation from '../profile/ProfileEducation';
import ProfileGithub from '../profile/ProfileGithub';
import { getProfileById } from '../../actions/profileActions';

const Profile = ({ match, myProfile, myAuth, getProfileById }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {myProfile.profile === null || myProfile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to Profiles
          </Link>
          {myAuth.isAuthenticated &&
            !myAuth.loading &&
            myAuth.user._id === myProfile.profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}

          <div className='profile-grid my-1'>
            <ProfileTop profile={myProfile.profile} />
            <ProfileAbout profile={myProfile.profile} />

            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {myProfile.profile.experience.length > 0 ? (
                <Fragment>
                  {myProfile.profile.experience.map(singleExperience => (
                    <ProfileExperience
                      key={singleExperience._id}
                      experience={singleExperience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience information</h4>
              )}
            </div>

            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {myProfile.profile.education.length > 0 ? (
                <Fragment>
                  {myProfile.profile.education.map(singleEducation => (
                    <ProfileEducation
                      key={singleEducation._id}
                      education={singleEducation}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education information</h4>
              )}
            </div>

            {myProfile.profile.githubusername && (
              <ProfileGithub
                githubUsername={myProfile.profile.githubusername}
              />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  myProfile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  myProfile: state.myProfile,
  myAuth: state.myAuth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
