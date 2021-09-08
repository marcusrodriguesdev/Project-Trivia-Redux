import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Tela de Ranking</h1>
        {
          ranking.map((player, index) => (
            <div key={ index }>
              <img
                src={ player.profileAvatar }
                alt={ player.gravatarEmail }
              />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </div>
          ))
        }
      </div>

    );
  }
}

export default Ranking;
