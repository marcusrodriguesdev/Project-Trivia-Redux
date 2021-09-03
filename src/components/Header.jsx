import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
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
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
