import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <br />
        <ul>
          { ranking.sort((first, second) => second.score - first.score)
            .map((player, index) => (
              <li key={ index }>
                <img src={ player.picture } alt={ `Img of ${player.name}` } />
                <h4 data-testid={ `player-name-${index}` }>{ player.name }</h4>
                <h4 data-testid={ `player-score-${index}` }>{ player.score }</h4>
              </li>
            ))}
        </ul>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar ao início
          </button>
        </Link>
      </div>
    );
  }
}

export default connect()(Ranking);
