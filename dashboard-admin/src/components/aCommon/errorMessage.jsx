// import React from 'react';
// import PropTypes from 'prop-types';


// const ErrorMessage = ({ message }) => {
//   return <div className="error-message">{message}</div>;
// };

// ErrorMessage.propTypes = {
//   message: PropTypes.string.isRequired,
// };

// export default ErrorMessage;
import React from 'react';

const ErrorMessage = ({ message }) => {
  return <div className="error-message">Error: {message}</div>; // Style this appropriately
};

export default ErrorMessage;