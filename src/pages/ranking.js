import React, { Component } from 'react';

class ranking extends Component {
  render() {
    const players = JSON.parse(localStorage.ranking)
      .short((a, b) => (b.score - a.score));
    return (
      <fieldset className="App">
        <div className="App">
          <h2 data-testid="ranking-title">Ranking</h2>
        </div>

        {players.map(({ name, picture, score }, i) => (
          <div key={ i }>
            <span>{i + 1}</span>
            <span>{' - '}</span>
            <img src={ picture } alt="PlayerImage" />
            <span data-testid={ `player-name-${index}` }>{name}</span>
            <span>{' - '}</span>
            <span data-testid={ `player-score-${index}` }>{score}</span>
          </div>
        ))}
      </fieldset>
    );
  }
}

export default ranking;
