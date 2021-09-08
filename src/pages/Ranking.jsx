import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  getGameRank() {
    const { ranking } = JSON.parse(localStorage.ranking);
    return ranking;
  }

  render() {
    const playerScorePosition = JSON.parse(localStorage.getItem('ranking'));
    return (
      <section>
        <h2 data-testid="ranking-title">Ranking</h2>
        {playerScorePosition ? [...playerScorePosition.sort((a, b) => (
          b.score - a.score))]
          .map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt="Player avatar" />
              <p data-testid={ `player-name-${index}` }>
                {player.name}
              </p>
              <p data-testid={ `player-score-${index}` }>
                {player.score}
              </p>
            </div>
          )) : <span>Deu ruim</span>}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Jogar novamente
          </button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
