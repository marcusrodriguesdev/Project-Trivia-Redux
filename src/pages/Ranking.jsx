import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadRanking } from '../services/getLocal';

export default class Ranking extends Component {
  render() {
    const rankingList = loadRanking();
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankingList.map((player, index) => (
          <div key={ player.id } data-testid={ `player-name-${index}` }>
            <img src={ player.image } alt="User logo" />
            {` ${player.name} - Pontos: `}
            <span data-testid={ `player-score-${index}` }>{player.score}</span>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }
}
