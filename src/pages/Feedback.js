import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const three = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions >= three ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <div>
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente
            </button>
          </Link>
        </div>
      </div>);
  }
}

export default FeedBack;
