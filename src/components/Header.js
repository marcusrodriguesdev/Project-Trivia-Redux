import React from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { name, email } = this.props;

    const hash = MD5(email).toString();
    return (

      <header>
        <img data-testid="header-profile-picture" alt="cabeça" src={ `https://www.gravatar.com/avatar/${hash}.jpg` } />
        <h2 data-testid="header-player-name">
          { name }
        </h2>
        <h1 data-testid="header-score"> SCORE: 0</h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(Header);
