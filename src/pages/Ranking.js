import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);

    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.map((player, index) => (
          <div key={ index }>
            <img src={ `https://www.gravatar.com/avatar/${player.picture}` } alt="player" />
            <p data-testid={ `player-name-${index}` }>
              {player.name}
            </p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Voltar ao início
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
