import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import '../App.css';
import Header from '../components/Header';
import Feedback from './Feedback';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
      time: 30,
      questionIndex: 0,
      questions: [],
      isVisible: false,
      renderFeedback: false,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.saveQuestions();
  }

  setTimer(callback) {
    this.setState((prevState) => ({ time: prevState.time - 1 }), callback);
  }

  nextQuestion() {
    const LAST_QUESTION = 4;
    const { questionIndex } = this.state;
    if (questionIndex === LAST_QUESTION) {
      this.setState({ renderFeedback: true });
    }

    this.setState((prevState) => ({
      ...prevState,
      questionIndex: prevState.questionIndex + 1,
      isVisible: false,
      time: 30,
    }));
  }

  handleClick(event) {
    this.changeColor();
    this.saveLocalStorage(event);
    this.setState({
      isVisible: true,
    });
  }

  changeColor() {
    const rightBtn = document.querySelector('.correct-btn');
    const wrongBtn = document.querySelectorAll('.wrong-btn');
    rightBtn.classList.add('correct-answer');
    wrongBtn.forEach((button) => {
      button.classList.add('wrong-answer');
    });
  }

  async saveQuestions() {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const obj = await response.json();
    this.setState({
      questions: [...obj.results],
    });
  }

  saveLocalStorage({ target }) {
    const answer = target.value;
    const { questions, questionIndex, time, player } = this.state;
    const { difficulty, correct_answer: correctAnswer } = questions[questionIndex];

    if (answer === correctAnswer) {
      let scoreMultiplier = 0;
      const THREE = 3;
      const TWO = 2;
      const ONE = 1;
      const TEN = 10;

      switch (difficulty) {
      case 'hard':
        scoreMultiplier = THREE;
        player.score += TEN + (time * scoreMultiplier);
        player.assertions += 1;
        break;
      case 'medium':
        scoreMultiplier = TWO;
        player.score += TEN + (time * scoreMultiplier);
        player.assertions += 1;
        break;
      case 'easy':
        scoreMultiplier = ONE;
        player.score += TEN + (time * scoreMultiplier);
        player.assertions += 1;
        break;
      default:
      }

      localStorage.setItem('state', JSON.stringify({ player }));
    }
  }

  renderQuestions() {
    const { questions, questionIndex, time } = this.state;
    const disabled = time === 0;
    const { category,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
      question } = questions[questionIndex];

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          disabled={ disabled }
          type="button"
          data-testid="correct-answer"
          className="correct-btn"
          onClick={ this.handleClick }
          value={ correctAnswer }
        >
          { correctAnswer }
        </button>
        {incorrectAnswer.map((answer, index) => (
          <button
            disabled={ disabled }
            value={ answer }
            onClick={ this.handleClick }
            className="wrong-btn"
            type="button"
            key={ index }
            data-testid={ `wrong-answers-${index}` }
          >
            { answer }
          </button>
        ))}
      </div>
    );
  }

  render() {
    const { questions, time, player, isVisible, renderFeedback } = this.state;
    const isFetching = questions.length === 0;
    return !renderFeedback ? (
      <>
        <Header score={ player.score } />
        <Timer setTimer={ this.setTimer } time={ time } />
        { !isFetching && this.renderQuestions() }

        {isVisible && (
          <button onClick={ this.nextQuestion } type="button" data-testid="btn-next">
            Próxima
          </button>)}
      </>
    ) : (<Feedback player={ player } />);
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  token: state.token.token,
});

Game.propTypes = {
  isFetching: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
