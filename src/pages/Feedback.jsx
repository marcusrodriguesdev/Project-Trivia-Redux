import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { player: { score, assertions } } = JSON.parse(localStorage.getItem('state'));
    const result = 3;
    return (
      <div>
        <Header score={ score } />
        <p data-testid="feedback-text">
          { assertions < result ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>

      </div>
    );
  }
}

export default Feedback;
