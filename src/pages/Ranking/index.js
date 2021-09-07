import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
    };

    this.setPlayers = this.setPlayers.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.sortPlayers = this.sortPlayers.bind(this);
  }

  componentDidMount() {
    this.setPlayers();
  }

  setPlayers() {
    const localPlayersString = window.localStorage.getItem('ranking');
    const localPlayers = JSON.parse(localPlayersString);
    const sortedPlayers = this.sortPlayers(localPlayers);
    this.setState({ players: sortedPlayers });
  }

  sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score);
  }

  handleHomeClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { players } = this.state;
    return (
      <div>
        <p data-testid="ranking-title">RANKING</p>
        {players.map((player, index) => (
          <div key={ index }>
            <img src={ player.picture } alt="foto de perfil" />
            <h3 key={ index } data-testid={ `player-name-${index}` }>
              {player.name}
            </h3>
            <h3 data-testid={ `player-score-${index}` }>{player.score}</h3>
          </div>
        ))}
        <button
          type="button"
          onClick={ this.handleHomeClick }
          data-testid="btn-go-home"
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
