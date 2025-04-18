// import React from 'react';
// import PropTypes from 'prop-types';


// const Button = ({ children, onClick, type = 'button', disabled, className = '', ...rest }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`button ${className}`}
//       {...rest}
//     >
//       {children}
//     </button>
//   );
// };

// Button.propTypes = {
//   children: PropTypes.node.isRequired,
//   onClick: PropTypes.func,
//   type: PropTypes.oneOf(['button', 'submit', 'reset']),
//   disabled: PropTypes.bool,
//   className: PropTypes.string,
// };

// export default Button;

import React from 'react';

const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;