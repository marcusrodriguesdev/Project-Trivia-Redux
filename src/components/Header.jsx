import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, avatar, score } = this.props;
    console.log(name);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ avatar }
          alt="profile"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default Header;
