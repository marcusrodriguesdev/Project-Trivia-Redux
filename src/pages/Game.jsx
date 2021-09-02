import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends Component {
  render() {
    const { name, email } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <div>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt="Gravatar" data-testid="header-profile-picture" />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h2 data-testid="header-score">0</h2>
        </header>
      </div>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.user,
  email: state.login.email,
});

export default connect(mapStateToProps, null)(Game);
