import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profileActions';

const Education = ({ myEducation, deleteEducation }) => {
  const educations = myEducation.map(education => (
    <tr key={education._id}>
      <td>{education.school}</td>
      <td className='hide-sm'>{education.degree}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{education.from}</Moment> -{' '}
        {education.to === null ? (
          'Now'
        ) : (
          <Moment format='DD/MM/YYYY'>{education.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteEducation(education._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      {myEducation.length > 0 && (
        <Fragment>
          <h2 className='my-2'>Education Credentials</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>Institution</th>
                <th className='hide-sm'>Degree</th>
                <th className='hide-sm'>Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{educations}</tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

Education.propTypes = {
  myEducation: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
