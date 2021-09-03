import React from 'react';
// import { MD5 } from 'crypto-js';
// import PropTypes from 'prop-types';

function Gravatar() {
  // { email }
  // const emailString = MD5(email).toString;
  return (
    <img
      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      alt="Icon's User"
      data-testid="header-profile-picture"
    />
  );
}

export default Gravatar;

// Gravatar.propTypes = {
//   email: PropTypes.string.isRequired,
// };
