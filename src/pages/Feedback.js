import React, { Component } from 'react';

export default class Feedback extends Component {
  render() {
    const userData = JSON.parse(localStorage.getItem('state'));
    console.log(userData);
    const { player } = userData;
    return (
      <div data-testid="feedback-text">
        <h1 data-testid="header-player-name">{player.name}</h1>
        <img data-testid="header-profile-picture" src={ player.picture } alt="avatar" />
        <p data-testid="header-score">
          {player.score}
        </p>

      </div>
    );
  }
}
