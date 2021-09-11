import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export const GRAVATAR = 'https://www.gravatar.com/avatar/';
export const CONVERT_HASH = (props) => MD5(props).toString();

class Header extends Component {
  render() {
    const { name, score, email } = this.props;

    return (
      <header className="header">
        <div className="name-header">
          <img
            src={ `${GRAVATAR}${CONVERT_HASH(email)}` }
            alt="avatar"
            data-testid="header-profile-picture"
          />

          <strong
            data-testid="header-player-name"
          >
            { name }
          </strong>
        </div>

        <div className="score-header">
          <span>Score: </span>
          <strong data-testid="header-score">{ score }</strong>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
