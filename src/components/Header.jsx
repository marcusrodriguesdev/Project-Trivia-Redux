import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    // const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    const profileAvatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return (
      <header>
        <img
          src={ profileAvatar }
          data-testid="header-profile-picture"
          alt="profile avatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.user.name,
  email: state.userReducer.user.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
