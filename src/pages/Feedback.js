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
        <h1
          className="feedback"
          data-testid="feedback-text"
        >
          {assertions >= three ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h1>
        <div>
          <Link to="/">
            <button
              className="button is-primary is-rounded button-fdbk-pg"
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              className="button is-warning is-rounded button-fdbk-pg"
              data-testid="btn-ranking"
              type="button"
            >
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>);
  }
}

export default FeedBack;
