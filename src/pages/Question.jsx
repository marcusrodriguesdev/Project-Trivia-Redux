import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { playerPoints } from '../actions';

const trivialink = 'https://opentdb.com/api.php?amount=5&token=';
const um = 1;
const dois = 2;
const tres = 3;
const cinco = 5;
const dez = 10;
const time = 30;
let timer = time;
let assertion = 0;
let pontos = 0;

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: {
        results: [
          {
            correct_answer: '',
            incorrect_answers: [],
          },
        ],
      },
      nextQuestion: false,
      countQuestion: 0,
      loading: true,
    };

    this.Answer = this.Answer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.incorrectAnswer = this.incorrectAnswer.bind(this);
    this.getTriviaApiResponse = this.getTriviaApiResponse.bind(this);
    this.borderColor = this.borderColor.bind(this);
    this.calculatedPoints = this.calculatedPoints.bind(this);
  }

  componentDidMount() {
    // let { timer } = this.state;
    const ONE_SECOND = 1000;
    this.getTriviaApiResponse();
    this.timeToRespond();
    setInterval(() => { timer -= 1; }, ONE_SECOND);
    console.log(timer);
  }

  componentDidUpdate() {
    const { countQuestion } = this.state;
    if (countQuestion === cinco) {
      const { name, gravatarEmail, score, assertions } = this.props;
      localStorage.setItem('player', JSON.stringify({
        name, gravatarEmail, score, assertions,
      }));
      return <Redirect to="/feedback" />;
    }
    document.querySelectorAll('#incorreta').forEach((button) => {
      button.className = '';
    });
    document.getElementById('correta').className = '';
    timer = time;
  }

  async getTriviaApiResponse() {
    const { countQuestion } = this.state;
    const token = localStorage.getItem('token');
    const responseApi = await fetch(`${trivialink}${token}`);
    const object = await responseApi.json();
    this.setState({
      questions: object,
      difficulty: object.results[countQuestion].difficulty,
      loading: false,
    });
  }

  questionNext() {
    let { countQuestion } = this.state;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          this.setState({
            countQuestion: (countQuestion += 1),
            nextQuestion: false,
          });
        } }
      >
        Próxima
      </button>
    );
  }

  borderColor({ target }) {
    this.setState({ nextQuestion: true },
      () => {
        document.querySelectorAll('#incorreta').forEach((button) => {
          button.className = 'red-border';
        });
        document.getElementById('correta').className = 'green-border';
      });
    this.calculatedPoints(target);
  }

  timeToRespond() {
    const THIRTY_SECONDS = 30000;
    setInterval(
      () => document.querySelectorAll('button').forEach((button) => {
        button.disabled = true;
      }),
      THIRTY_SECONDS,
    );
  }

  correctAnswer(alternative, index) {
    return (
      <button
        id="correta"
        type="button"
        data-testid="correct-answer"
        key={ index }
        onClick={ this.borderColor }
      >
        {alternative}
      </button>
    );
  }

  incorrectAnswer(alternative, index) {
    return (
      <button
        id="incorreta"
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ index }
        onClick={ this.borderColor }
      >
        {alternative}
      </button>
    );
  }

  Answer(alternative, correctAnswer, index) {
    for (let i = 0; i < alternative.length; i += 1) {
      if (alternative === correctAnswer) {
        return this.correctAnswer(alternative, index);
      }
    }
    return this.incorrectAnswer(alternative, index);
  }

  calculatedPoints(target) {
    const { submitPlayerPoints } = this.props;
    if (target.id === 'correta') {
      assertion += 1;
      const { difficulty } = this.state;
      let difficultyValue = 0;
      switch (difficulty) {
      case 'easy':
        difficultyValue = um;
        break;
      case 'medium':
        difficultyValue = dois;
        break;
      case 'hard':
        difficultyValue = tres;
        break;
      default:
        break;
      }
      pontos += (dez + (timer * difficultyValue));
    }
    submitPlayerPoints({ pontos, assertion });
  }

  render() {
    const { questions, loading, countQuestion, nextQuestion } = this.state;

    if (loading) return <h1>Loading...</h1>;
    if (countQuestion === cinco) {
      const { name, gravatarEmail, score, assertions } = this.props;
      localStorage.setItem('player', JSON.stringify({
        name, gravatarEmail, score, assertions,
      }));
      return <Redirect to="/feedback" />;
    }

    const questionTrivia = questions.results[countQuestion];
    const alternatives = [
      ...questionTrivia.incorrect_answers,
      questionTrivia.correct_answer,
    ].sort();

    return (
      <div>
        <h2 data-testid="question-text">{questionTrivia.question}</h2>
        <span data-testid="question-category">{questionTrivia.category}</span>
        <div>
          {alternatives.map((alternative, index) => this.Answer(
            alternative, questionTrivia.correct_answer, index,
          ))}
        </div>
        {nextQuestion ? this.questionNext() : ''}
      </div>
    );
  }
}

Question.propTypes = {
  submitPlayerPoints: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.email,
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  submitPlayerPoints: (payload) => dispatch(playerPoints(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
