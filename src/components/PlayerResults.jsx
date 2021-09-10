import React, { Component } from 'react';

class PlayerResults extends Component {
  render() {
    let playerState = localStorage.getItem('state');
    playerState = JSON.parse(playerState);
    const { player: { score, assertions } } = playerState;
    return (
      <div>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">{ score }</p>
      </div>
    );
  }
}

export default PlayerResults;
