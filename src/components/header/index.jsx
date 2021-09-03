import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gravatar from '../gravatar';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <header>
        <Gravatar />
        <span data-testId="header-player-game">{name}</span>
        <span data-testId="header-score">{score}</span>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { user, score } }) => ({
  user,
  score,
});
export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
