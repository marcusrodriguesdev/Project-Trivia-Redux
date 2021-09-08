import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Feedback extends Component {
  render() {
    const userData = JSON.parse(localStorage.getItem('state'));
    const NUMBER = 3;
    const { player } = userData;
    return (
      <div data-testid="feedback-text">
        <h1 data-testid="header-player-name">{player.name}</h1>
        <img
          data-testid="header-profile-picture"
          src={ player.picture }
          alt="avatar"
        />
        <p data-testid="header-score">{player.score}</p>
        <p data-testid="feedback-total-score">{player.score}</p>
        <p data-testid="feedback-total-question">{player.assertions}</p>
        {player.assertions < NUMBER ? 'Podia ser melhor...' : 'Mandou bem!'}
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}
