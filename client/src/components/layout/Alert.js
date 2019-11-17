import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ myAlerts }) =>
  myAlerts !== null &&
  myAlerts.length > 0 &&
  myAlerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  myAlerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  myAlerts: state.myAlerts
});

export default connect(mapStateToProps)(Alert);
