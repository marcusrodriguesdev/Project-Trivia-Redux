import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Questions.css';
import { actionPlayerScore } from '../actions';

const TEN_POINTS = 10;
const THREE = 3;
const TWO = 2;
const ONE = 1;
const ZERO = 0;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      correct: null,
      incorrect: null,
      seconds: 30,
      disable: false,
    };
    this.handleClickClassName = this.handleClickClassName.bind(this);
    this.rulesOfUpdate = this.rulesOfUpdate.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((estadoAnterior) => ({ seconds: estadoAnterior.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.seconds === 0) {
      this.rulesOfUpdate();
    }
  }

  rulesOfUpdate() {
    this.setState({
      seconds: 0,
      incorrect: 'incorrect',
      correct: 'correct',
      disable: true });
  }

  checkDifficulty(e) {
    switch (e) {
    case 'hard':
      return THREE;
    case 'medium':
      return TWO;
    case 'easy':
      return ONE;
    default:
      return ZERO;
    }
  }

  handleClickClassName({ target }) {
    const { resp, player, playerStatus: { score, assertions } } = this.props;
    const { seconds } = this.state;
    // boo
    if (target.id === 'correct-answer') {
      const { difficulty } = resp[0];
      const pointsFromDifficulty = this.checkDifficulty(difficulty);
      const timerPoints = seconds;
      const correctAnswerPoints = TEN_POINTS + timerPoints * pointsFromDifficulty;
      const sum = correctAnswerPoints + score;
      const playerScore = {
        player: {
          name: '',
          assertions: 1 + assertions,
          score: sum,
          gravatarEmail: '',
        },
      };
      localStorage.setItem('state', JSON.stringify(playerScore));
      player(1, sum);
    }

    this.setState({ incorrect: 'incorrect', correct: 'correct' });
  }

  render() {
    const { correct, incorrect, seconds, disable } = this.state;
    const { resp } = this.props;
    return (
      <div>
        <seconds>{seconds}</seconds>
        <p data-testid="question-category">{resp[0].category}</p>
        <p data-testid="question-text">{resp[0].question}</p>
        <button
          className={ correct }
          onClick={ this.handleClickClassName }
          data-testid="correct-answer"
          id="correct-answer"
          type="button"
          disabled={ disable }
        >
          {resp[0].correct_answer}
        </button>
        {resp[0].incorrect_answers
          .map((element, index) => (
            <div key={ index }>
              <button
                className={ incorrect }
                onClick={ this.handleClickClassName }
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                disabled={ disable }
              >
                {element}
              </button>
            </div>
          ))}
      </div>
    );
  }
}

Questions.propTypes = {
  player: PropTypes.func.isRequired,
  resp: PropTypes.objectOf(PropTypes.string).isRequired,
  playerStatus: PropTypes.objectOf(PropTypes.number).isRequired,
};

const mapStateToProps = (state) => ({
  playerStatus: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  player: (assertions, score) => dispatch(actionPlayerScore(assertions, score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
