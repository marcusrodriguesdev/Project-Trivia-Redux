import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking = ranking.sort((value1, value2) => value2.score - value1.score);
    return (
      <div>
        <header data-testid="ranking-title">
          Ranking
        </header>
        { ranking.map((match, index) => (
          <div key={ index }>
            <img src={ `https://www.gravatar.com/avatar/${match.picture}` } alt={ match.name } />
            <h3 data-testid={ `player-name-${index}` }>{ match.name }</h3>
            <h2 data-testid={ `player-score-${index}` }>{ match.score }</h2>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
