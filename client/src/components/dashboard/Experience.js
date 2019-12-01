import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profileActions';

const Experience = ({ myExperience, deleteExperience }) => {
  const experiences = myExperience.map(experience => (
    <tr key={experience._id}>
      <td>{experience.company}</td>
      <td className='hide-sm'>{experience.title}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{experience.from}</Moment> -{' '}
        {experience.to === null ? (
          'Now'
        ) : (
          <Moment format='DD/MM/YYYY'>{experience.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteExperience(experience._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      {myExperience.length > 0 && (
        <Fragment>
          <h2 className='my-2'>Experience Credentials</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>Company</th>
                <th className='hide-sm'>Title</th>
                <th className='hide-sm'>Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{experiences}</tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

Experience.propTypes = {
  myExperience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
