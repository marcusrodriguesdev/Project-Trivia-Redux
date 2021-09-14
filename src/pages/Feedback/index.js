import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderFeedback from '../../Components/HeaderFeedback';
import './styles.css';
import nino from '../../Images/nino.webp';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageBad: 'Plift ploft still, a porta não se abriu...',
      feedbackBad: 'Podia ser melhor...',
      messageGood: 'Plift ploft still, a porta se abriu!',
      feedbackGood: 'Mandou bem!',
    };
  }

  phraseConstructor(number) {
    let message;
    const minNumber = 3;
    const { messageBad, feedbackBad, messageGood, feedbackGood } = this.state;
    const elementBad = (
      <div>
        <p>
          {
            messageBad
          }
        </p>
        <p>
          {
            feedbackBad
          }
        </p>
      </div>
    );

    const elementGood = (
      <div>
        <p>
          {
            messageGood
          }
        </p>
        <p>
          {
            feedbackGood
          }
        </p>
      </div>
    );

    if (number < minNumber) message = elementBad;
    else if (number >= minNumber) message = elementGood;

    return message;
  }

  render() {
    const { correctQuestionCounter, totalScore, history } = this.props;
    return (
      <main className="feedback-main">
        <HeaderFeedback />
        <section className="feedback-image-container">
          <div className="feedback-text-container">
            <div data-testid="feedback-text">
              {this.phraseConstructor(correctQuestionCounter)}
            </div>
            <div className="feedback-score">
              Pontuação:
              <p data-testid="feedback-total-score">
                {totalScore}
              </p>
            </div>
            <div className="feedback-score">
              Respostas Corretas:
              <p data-testid="feedback-total-question">
                {correctQuestionCounter}
              </p>
            </div>
          </div>
          <img src={ nino } alt="nino" />
        </section>

        <div className="feedback-button-container">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
            className="button-playagain"
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
            className="button-ranking"
          >
            Ver Ranking
          </button>

        </div>

      </main>

    );
  }
}

const mapStateToProps = (state) => ({
  correctQuestionCounter: state.apiReducer.userData.correctQuestionCounter,
  totalScore: state.apiReducer.userData.score,
});

Feedback.propTypes = {
  correctQuestionCounter: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  totalScore: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
