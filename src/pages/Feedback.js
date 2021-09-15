import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

export default class Feedback extends Component {
  componentDidMount() {
    const { player } = this.props;
    const { score, name, gravatarEmail } = player;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const hash = md5(gravatarEmail).toString();

    const newPlayer = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${hash}`,
    };

    if (ranking) {
      localStorage.setItem('ranking', JSON.stringify([...ranking, newPlayer]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newPlayer]));
    }
  }

  render() {
    const { player } = this.props;
    const { score, assertions } = player;
    const THREE = 3;
    return (
      <div className="c-feedback-screen">
        <div className="feedback-screen">
          <Header score={ score } />
        </div>
        <h2 data-testid="feedback-text">
          {
            assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'
          }
        </h2>
        <p
          data-testid="feedback-total-question"
        >
          {` Voce acertou ${assertions} de 5 perguntas! `}
        </p>
        <div className="feedback-buttons">
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              type="button"
            >
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
    gravatarEmail: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
