import React from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;

    const hash = MD5(gravatarEmail).toString();
    return (
      <header className="main-header">
        <img data-testid="header-profile-picture" alt="cabeça" src={ `https://www.gravatar.com/avatar/${hash}` } />
        <h2 data-testid="header-player-name">
          { name }
        </h2>
        <h1>
          SCORE:
          {' '}
          <span data-testid="header-score">{score}</span>
        </h1>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default Header;
