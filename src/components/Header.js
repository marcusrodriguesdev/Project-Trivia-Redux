import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchGravatar from '../redux/actions/fetch/fetchGravatar';

class Header extends Component {
  render() {
    const { playerName, hash } = this.props;
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    return (
      <div className="App-header">
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Player"
          data-testid="header-profile-picture"
        />
        <div className="header-player-info">
          <div data-testid="header-player-name">{ `Jogador: ${playerName}` }</div>
          <div className="scoreboard">
            <div>Placar:</div>
            <div data-testid="header-score">{ score }</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  playerName: state.user.playerName,
});

const mapDispatchToProps = (dispatch) => ({
  pushGravatar: (state) => dispatch(fetchGravatar(state)),
});

Header.propTypes = {
  email: PropTypes.string,
  playerName: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
