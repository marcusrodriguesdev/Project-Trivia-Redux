import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Tela de Ranking</h1>
        {
          ranking.map((player, index) => (
            <div key={ index }>
              <img
                src={ player.picture }
                alt={ player.name }
              />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ Number(player.score) }</p>
            </div>
          ))
        }
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Tela de Inicial
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
