import React from 'react';
import { Link } from 'react-router-dom';
import '../Ranking.css';

export default class Ranking extends React.Component {
  renderRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);
    return (
      <ol>
        {ranking.map((player, index) => (
          <li key={ index }>
            <span className="ranking-number">{`${index + 1}`}</span>
            <img
              src={ player.picture }
              alt="foto legal"
            />
            <span data-testid={ `player-name-${index}` }>{player.name}</span>
            <span data-testid={ `player-score-${index}` }>{player.score}</span>
          </li>))}
      </ol>
    );
  }

  render() {
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        {this.renderRanking()}
        <Link
          to="/"
          data-testid="btn-go-home"
        >
          <button type="button">
            Inicio
          </button>
        </Link>
      </div>
    );
  }
}
