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
      numberQuestion: 0,
      visibilit: 'hide',
    };
    this.handleClickClassName = this.handleClickClassName.bind(this);
    this.rulesOfUpdate = this.rulesOfUpdate.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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
  }

  // handleClickClassName({ target: { name } }) {
  //   this.setState({ incorrect: 'incorrect', correct: 'correct' });
  //   const teste = name;
  //   console.log(teste);
  //   if (teste === 'correct' || teste === 'incorrect') {
  //     this.setState({
  //       visibilit: 'show',
  //     });
  //   }
  // }

  nextQuestion() {
    this.setState((estadoAnterior) => ({
      numberQuestion: estadoAnterior.numberQuestion + 1,
      seconds: 30,
    }));
  }

  render() {
    // embaralhar questões incorretas/ sort
    const { correct, incorrect, seconds, disable,
      numberQuestion, visibilit } = this.state;
    const { resp } = this.props;
    return (
      <div>
        <seconds>{seconds}</seconds>
        <p data-testid="question-category">{resp[numberQuestion].category}</p>
        <p data-testid="question-text">{resp[numberQuestion].question}</p>
        <button
          className={ correct }
          name="correct"
          onClick={ this.handleClickClassName }
          data-testid="correct-answer"
          id="correct-answer"
          type="button"
          disabled={ disable }
        >
          {resp[numberQuestion].correct_answer}
        </button>
        {resp[numberQuestion].incorrect_answers
          .map((element, index) => (
            <div key={ index }>
              <button
                name="incorrect"
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
        <div>
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
            className={ seconds === 0 ? 'show' : visibilit }
          >
            Próxima
          </button>
        </div>
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
