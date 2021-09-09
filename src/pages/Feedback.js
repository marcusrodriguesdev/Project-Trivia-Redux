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
      <div>
        <Header score={ score } />
        <span data-testid="feedback-text">
          {
            assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'
          }
        </span>
        <span data-testid="feedback-total-score">{ score }</span>
        <span data-testid="feedback-total-question">{ assertions }</span>
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
