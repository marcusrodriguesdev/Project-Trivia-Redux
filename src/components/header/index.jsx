import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Gravatar from '../gravatar';

class Header extends Component {
  render() {
    const { user, score, email } = this.props;
    return (
      <header data-testId="header-player-name" className="header-container-main">
        <Gravatar email={ email } />
        <span
          data-testId="header-player-game"
          className="header-container-user"
        >
          {user}
        </span>
        <span
          data-testId="header-score"
          className="header-container-score"
        >
          {score}
        </span>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { user, score, email } }) => ({
  user,
  score,
  email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  user: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};
