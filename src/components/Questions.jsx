import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './Questions.css';
import { actionPlayerScore, actionForScores } from '../actions';

const TEN_POINTS = 10;
const THREE = 3;
const TWO = 2;
const ONE = 1;
const ZERO = 0;
const STYLE_BUTTON = 'button is-light my-2';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      correct: STYLE_BUTTON,
      incorrect: STYLE_BUTTON,
      seconds: 30,
      disable: false,
      numberQuestion: 0,
      visibilit: 'hide',
      redirect: false,
      scori: 0,
      correctAs: '',
      alea: [],
      question: '',
      category: '',
    };
    this.handleClickClassName = this.handleClickClassName.bind(this);
    this.handleClickClassNameHelper = this.handleClickClassNameHelper.bind(this);
    this.rulesOfUpdate = this.rulesOfUpdate.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.aleatoryQuestion = this.aleatoryQuestion.bind(this);
  }

  componentDidMount() {
    const { resp } = this.props;
    const { numberQuestion } = this.state;
    this.aleatoryQuestion();
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((estadoAnterior) => ({ seconds: estadoAnterior.seconds - 1 }));
    }, ONE_SECOND);
    this.setState({ correctAs: resp[numberQuestion].correct_answer,
      question: resp[numberQuestion].question,
      category: resp[numberQuestion].category });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.seconds === 0) {
      this.rulesOfUpdate();
    }
  }

  rulesOfUpdate() {
    this.setState({
      seconds: 0,
      incorrect: 'button is-danger my-2',
      correct: 'button is-success my-2',
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
    this.handleClickClassNameHelper(target.name);
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
      this.setState((estadoAnterior) => ({ scori: estadoAnterior.scori + sum }));
    }
  }

  handleClickClassNameHelper(a) {
    this.setState({ incorrect: 'button is-danger my-2',
      correct: 'button is-success my-2' });
    const n = a;
    if (n === 'correct' || n === 'incorrect') {
      this.setState({
        visibilit: 'button is-info',
      });
    }
  }

  shuffle(array) {
    let arrKeys = Object.keys(array);
    const newArray = [];
    while (arrKeys.length > 0) {
      const randomIndex = Math.floor(Math.random() * (arrKeys.length - 1));

      newArray.push(array[arrKeys[randomIndex]]);

      delete arrKeys[randomIndex];
      arrKeys = arrKeys.filter(() => true);
    }
    return newArray;
  }

  aleatoryQuestion() {
    const { numberQuestion } = this.state;
    const { resp } = this.props;
    const correct = resp[numberQuestion].correct_answer;
    const incorrect = resp[numberQuestion].incorrect_answers.join(',');
    const allAnswers = `${correct},${incorrect}`;
    const answers = allAnswers.split(',');
    const arrayAleatory = this.shuffle(answers);
    this.setState({ alea: arrayAleatory });
  }

  nextQuestion() {
    const { numberQuestion, scori } = this.state;
    const { resp }= this.props;
    const { user, arrayOfScoreAndName, playerStatus: { assertions } } = this.props;
    const question = 4;
    if (numberQuestion === question) {
      const playerScore = {
        player: {
          name: user,
          assertions: 1 + assertions,
          score: scori,
          gravatarEmail: '',
        },
      };
      this.setState({ redirect: true });
      arrayOfScoreAndName(playerScore);
    }
    const teste = resp[numberQuestion].correct_answer;
    this.setState((estadoAnterior) => ({
      numberQuestion: estadoAnterior.numberQuestion + 1,
      seconds: 30,
      correct: STYLE_BUTTON,
      incorrect: STYLE_BUTTON,
      visibilit: 'hide',
      correctAs: teste,
      question: resp[numberQuestion].question,
      category: resp[numberQuestion].category,
    }));
    this.aleatoryQuestion();
  }

  render() {
    const { redirect, correct, incorrect, seconds, disable, numberQuestion, visibilit, correctAs, alea, question, category } = this.state;
    const { resp } = this.props;
    if (redirect === true) { return <Redirect to="/feedback" />; }
    return (
      <div className="has-text-warning-light">
        <h1 className="title is-3">Bem vindo ao Quiz Trivia! responda em 30 segundos para acumular pontos!</h1>
        <seconds className="title is-3">{seconds}</seconds>
        <p className="title is-3" data-testid="question-category">{`Categoria ${category}`}</p>
        <p className="subtitle is-4" data-testid="question-text">{question}</p>
        {console.log(alea)}
        {alea.map((element, index) => {
          console.log(element, correctAs);
          if (element === correctAs) {
            return (
              <button
                className={ correct }
                name="correct"
                onClick={ this.handleClickClassName }
                data-testid="correct-answer"
                id="correct-answer"
                type="button"
                disabled={ disable }
              >
                {element}
              </button>
            );
          }
          return( <button
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
          )
          })
        }
)
<div>
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
            className={ seconds === 0 ? 'button is-info' : visibilit }
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  arrayOfScoreAndName: PropTypes.func.isRequired,
  player: PropTypes.func.isRequired,
  playerStatus: PropTypes.objectOf(PropTypes.number).isRequired,
  resp: PropTypes.objectOf(PropTypes.string).isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  playerStatus: state.player,
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  player: (assertions, score) => dispatch(actionPlayerScore(assertions, score)),
  arrayOfScoreAndName: (score) => dispatch(actionForScores(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
