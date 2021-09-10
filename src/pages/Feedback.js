import React from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';

import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.pushGame = this.pushGame.bind(this);
    this.pushRanking = this.pushRanking.bind(this);
    this.renderButao = this.renderButao.bind(this);
    this.sendToRanking = this.sendToRanking.bind(this);
  }

  componentDidMount() {
    this.sendToRanking();
  }

  sendToRanking() {
    const {
      player:
      {
        score,
        gravatarEmail,
        name,
      },
    } = JSON.parse(localStorage.getItem('state'));

    const hash = MD5(gravatarEmail).toString();
    const picture = ` https://www.gravatar.com/avatar/${hash}`;
    const rank = { name, score, picture };
    const ranking = localStorage.getItem('ranking');

    if (!ranking) {
      return localStorage.setItem('ranking', JSON.stringify([rank]));
    }
    const rankingArray = JSON.parse(ranking);
    rankingArray.push(rank);
    const invalid = -1;
    rankingArray.sort((a, b) => {
      if (a.score > b.score) return 1;
      if (a.score < b.score) return invalid;
      return 0;
    }).reverse();
    localStorage.setItem('ranking', JSON.stringify(rankingArray));
    // const invalid = -1;
    // const sorted = [];
    // const sortedRanking = [];

    // rankingArray.forEach((element) => {
    //   let maxValue = 0;
    //   rankingArray.forEach((element1) => {
    //     const isSorted = sorted.find((el) => el === element.score);
    //     if (isSorted !== invalid) return;
    //     if (element1.score > maxValue) {
    //       maxValue = element1.score;
    //     }
    //   });
    //   if (isSorted !== invalid) return;
    //   if (element.score >= maxValue) {
    //     maxValue = element.score;
    //     sorted.push(maxValue);
    //     sortedRanking.push(element);
    //   }
    // });
  }

  pushGame() {
    const { history } = this.props;
    history.push('/');
  }

  pushRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  renderButao() {
    return (
      <>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.pushGame }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.pushRanking }
        >
          Ver Ranking
        </button>
      </>
    );
  }

  render() {
    const {
      player:
      {
        score,
        gravatarEmail,
        name,
        assertions,
      },
    } = JSON.parse(localStorage.getItem('state'));
    return (
      <>
        <Header
          gravatarEmail={ gravatarEmail }
          score={ score }
          name={ name }
        />
        <div>
          { assertions > 2 ? (
            <p data-testid="feedback-text">Mandou bem!</p>
          ) : (
            <p data-testid="feedback-text">Podia ser melhor...</p>
          )}
          <p>
            Você acertou
            <span data-testid="feedback-total-question">{ assertions }</span>
            questões
          </p>
          <p>
            Um total de
            <span data-testid="feedback-total-score">{ score }</span>
            pontos
          </p>
          {this.renderButao()}
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
