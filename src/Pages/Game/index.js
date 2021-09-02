import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { dados: { name, profile } } = this.props;
    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">
            { name }
          </h1>
          <img
            src={ `https://www.gravatar.com/avatar/${profile}` }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-score">0</span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dados: state.loginReducer,
});

export default connect(mapStateToProps, null)(Game);

Game.propTypes = {
  dados: PropTypes.objectOf(PropTypes.string).isRequired,
};
