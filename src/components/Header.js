import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { playerName, hash } = this.props;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Player"
          data-testid="header-profile-picture"
        />
        <div data-testid="header-player-name">{ playerName }</div>
        <div data-testid="header-score">0</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  playerName: state.user.name,
});

Header.propTypes = {
  email: PropTypes.string,
  playerName: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
