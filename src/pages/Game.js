import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import '../App.css';
import Header from '../components/Header';

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
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
  }

  componentDidMount() {
    this.saveQuestions();
  }

  setTimer(callback) {
    this.setState((prevState) => ({ time: prevState.time - 1 }), callback);
  }

  handleClick(event) {
    this.changeColor();
    this.saveLocalStorage(event);
  }

  changeColor() {
    const rightBtn = document.querySelector('.correct-btn');
    const wrongBtn = document.querySelectorAll('.wrong-btn');
    rightBtn.className = 'correct-answer';
    wrongBtn.forEach((button) => {
      button.className = 'wrong-answer';
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
    const { questions, time, player } = this.state;
    const isFetching = questions.length === 0;
    return (
      <>
        <Header score={ player.score } />
        <Timer setTimer={ this.setTimer } time={ time } />
        { !isFetching && this.renderQuestions() }
      </>
    );
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
