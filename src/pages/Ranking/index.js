import React, { Component } from 'react';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    const localPlayersString = window.localStorage.getItem('ranking');
    const localPlayers = JSON.parse(localPlayersString);
    this.setState({ players: localPlayers });
  }

  render() {
    const { players } = this.state;
    return (
      <div>
        <p data-testid="ranking-title">RANKING</p>
        {players.map((player, index) => (
          <div key={ index }>
            <img src={ player.picture } alt="foto de perfil" />
            <h3 key={ index } data-testid={ `player-name-${index}` }>{player.name}</h3>
            <h3 data-testid={ `player-score-${index}` }>{player.score}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default Ranking;
