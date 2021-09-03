import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { name } = this.props;
    console.log(name);
    return (
      <header>
        <img
          src="https://www.gravatar.com/avatar/"
          data-testid="header-profile-picture"
          alt="gravatar"
        />
        <h3 data-testid="header-player-name">
          { name }
        </h3>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
