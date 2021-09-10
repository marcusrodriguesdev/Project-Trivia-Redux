import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.pushGame = this.pushGame.bind(this);
    this.pushRanking = this.pushRanking.bind(this);
    this.renderButao = this.renderButao.bind(this);
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
