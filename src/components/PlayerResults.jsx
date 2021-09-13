import React, { Component } from 'react';

class PlayerResults extends Component {
  render() {
    let playerState = localStorage.getItem('state');
    playerState = JSON.parse(playerState);
    const { player: { score, assertions, name } } = playerState;
    return (
      <div>
        <p data-testid="header-player-name">{ `Nome: ${name}` }</p>
        <p data-testid="feedback-total-question">{ `Acertos: ${assertions}` }</p>
        <p data-testid="feedback-total-score">{ `Pontuação: ${score}` }</p>
      </div>
    );
  }
}

export default PlayerResults;
