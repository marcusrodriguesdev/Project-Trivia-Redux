import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, avatar, score } = this.props;
    return (
      <header className="game-header">
        <div className="game-header-column">
          <img
            src={ avatar }
            alt="Profile"
            className="game-header-profile-picture"
            data-testid="header-profile-picture"
          />
          <span
            className="game-header-player-name"
            data-testid="header-player-name"
          >
            { name }
          </span>
        </div>
        <div className="game-header-column">
          <p className="game-header-score">
            Pontos:
            <span data-testid="header-score">
              { score }
            </span>
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default Header;
