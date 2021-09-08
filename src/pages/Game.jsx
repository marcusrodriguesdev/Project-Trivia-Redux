import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
      over: false,
      shuffledArray: [],
      alreadyShuffled: false,
      questionIndex: 0,
      disabled: false,
    };
    this.bindings();
  }

  componentDidUpdate() {
    console.log('Atualizei');
    const { timer, alreadyShuffled } = this.state;
    const { questions } = this.props;
    if (timer === 0) {
      this.resetTimer();
    }
    if (alreadyShuffled === false) {
      this.handleAnswers(questions);
    }
  }

  bindings() {
    this.renderQuestion = this.renderQuestion.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.renderCorrectButton = this.renderCorrectButton.bind(this);
    this.renderIncorrectButton = this.renderIncorrectButton.bind(this);
    this.countdownTimer = this.countdownTimer.bind(this);
    this.handleClass = this.handleClass.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.timeIsOver = this.timeIsOver.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  handleClass(event) {
    this.setState({
      disabled: true,
    });

    const { target } = event;
    const parentDiv = target.parentElement;
    const buttons = parentDiv.querySelectorAll('button');
    buttons.forEach((button) => {
      const { dataset: { testid } } = button;
      button.classList.add(testid);
    });
  }

  resetTimer() {
    const { interval } = this.state;
    clearInterval(interval);
    this.setState({
      timer: 30,
      over: true,
    });
  }

  countdownTimer() {
    const oneSecond = 1000;
    const interval = setInterval(() => {
      this.setState(({ timer }) => ({
        timer: timer - 1,
      }));
    }, oneSecond);
    this.setState({
      interval,
    });
  }

  handleAnswers(questions) {
    if (questions.length > 1) {
      const questionIndex = 0;
      const arrayOfAnswers = [{ id: 4,
        correct: true,
        answer: questions[questionIndex].correct_answer }];
      questions[questionIndex].incorrect_answers.forEach((element, index) => (
        arrayOfAnswers.push({ id: index,
          correct: false,
          answer: questions[questionIndex].incorrect_answers[index] })
      ));
      const shuffledArray = this.shuffleArray(arrayOfAnswers);
      this.countdownTimer();
      this.setState({
        shuffledArray,
        alreadyShuffled: true,
      });
    }
  }

  // Função que embaralha arrays
  shuffleArray(array) { // Função provinda de "https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array"
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  timeIsOver(disabled) {
    if (disabled === false) {
      this.setState({
        disabled: true,
      });
    }
    return (
      <h2>Tempo Esgotado</h2>
    );
  }

  nextQuestion() {
    this.setState((prevstate) => ({ questionIndex: prevstate.questionIndex + 1, disabled: false }));
  }

  renderCorrectButton(questions, questionIndex, index, disabled) {
    return (
      <button
        key={ index }
        type="button"
        disabled={ disabled }
        data-testid="correct-answer"
        onClick={ this.handleClass }
      >
        {questions[questionIndex].correct_answer}
      </button>
    );
  }

  renderIncorrectButton(questions, questionIndex, index, disabled) {
    return (
      <button
        key={ index }
        type="button"
        disabled={ disabled }
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.handleClass }
      >
        {questions[questionIndex].incorrect_answers[index]}
      </button>
    );
  }

  renderQuestion(questions, shuffledArray, questionIndex, over) {
    if (questions.length > 1) {
      const { disabled } = this.state;
      return (
        <div>
          <h4 data-testid="question-category">{questions[questionIndex].category}</h4>
          <p data-testid="question-text">{questions[questionIndex].question}</p>
          {shuffledArray.map((element) => (
            element.correct
              ? this
                .renderCorrectButton(questions, questionIndex, element.id, disabled)
              : this
                .renderIncorrectButton(questions, questionIndex, element.id, disabled)
          ))}
          {over === false ? this.renderTimer() : this.timeIsOver(disabled)}
        </div>
      );
    }
    return (
      <h4>Preparando Quiz</h4>
    );
  }

  renderTimer() {
    const { timer } = this.state;
    return (
      <h2>{timer}</h2>
    );
  }

  render() {
    const { name, questions } = this.props;
    const { over, shuffledArray, questionIndex, disabled } = this.state;
    return (
      <div>
        <header>
          <img
            src="https://www.gravatar.com/avatar/"
            data-testid="header-profile-picture"
            alt="gravatar"
          />
          <h3 data-testid="header-player-name">
            { name }
          </h3>
          <p data-testid="header-score">0</p>
        </header>
        {this.renderQuestion(questions, shuffledArray, questionIndex, over)}
        {
          disabled ? (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.nextQuestion }
            >
              Próxima
            </button>
          ) : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  questions: state.game.questions,
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Game);
