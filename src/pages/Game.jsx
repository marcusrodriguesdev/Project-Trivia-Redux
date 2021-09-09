import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateScore } from '../actions';
import Header from '../components/Header';
import setInitialState from '../helpers';

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
      answered: false,
      redirect: false,
    };
    this.bindings();
  }

  componentDidMount() { setInitialState(); }

  componentDidUpdate() {
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
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.timeIsOver = this.timeIsOver.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  handleScore(questionIndex) {
    const TEN = 10;
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const { questions, updateScoreProp } = this.props;
    const difficultyQ = questions[questionIndex].difficulty;
    let rightDifficulty = Buffer.from(difficultyQ, 'base64').toString('utf-8');
    const { timer } = this.state;
    if (rightDifficulty === 'easy') {
      rightDifficulty = ONE;
    } else if (rightDifficulty === 'medium') {
      rightDifficulty = TWO;
    } else if (rightDifficulty === 'hard') {
      rightDifficulty = THREE;
    }
    const currentScore = (TEN + (timer * rightDifficulty));
    updateScoreProp(currentScore);
  }

  handleClickAnswer(event) {
    this.setState({
      disabled: true,
      answered: true,
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

  updateTimer() {
    const interval = 1000;
    const setTime = setInterval(this.timer, interval);
    return (setTime);
  }

  nextQuestion() {
    this.setState((prevstate) => ({
      questionIndex: prevstate.questionIndex + 1,
      alreadyShuffled: false,
      timer: 30,
      over: false,
      answered: false,
      disabled: false,
    }));
    const questionContainer = document.querySelectorAll('#question-container button');
    for (let index = 0; index < questionContainer.length; index += 1) {
      questionContainer[index].classList.remove('correct-answer');
      questionContainer[index].classList.remove('wrong-answer-0');
      questionContainer[index].classList.remove('wrong-answer-1');
      questionContainer[index].classList.remove('wrong-answer-2');
    }
    const { questionIndex } = this.state;
    const questionLength = 4;
    if (questionIndex < questionLength) {
      this.setState((prevstate) => ({
        questionIndex: prevstate.questionIndex + 1,
        disabled: false
      }), () => this.updateTimer());
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  renderCorrectButton(questions, questionIndex, index, disabled) {
    const base64Correct = JSON.stringify(questions[questionIndex].correct_answer);
    if (base64Correct !== undefined) {
      const buffCorrect = Buffer.from(base64Correct, 'base64');
      const stringCorrect = buffCorrect.toString('utf-8');
      return (
        <button
          key={ index }
          type="button"
          disabled={ disabled }
          data-testid="correct-answer"
          onClick={ (event) => {
            this.handleClickAnswer(event);
            this.handleScore(questionIndex);
          } }
        >
          {stringCorrect}
        </button>
      );
    }
  }

  renderIncorrectButton(questions, questionIndex, index, disabled) {
    const base64Incorrect = JSON
      .stringify(questions[questionIndex].incorrect_answers[index]);
    if (base64Incorrect !== undefined) {
      const buffIncorrect = Buffer.from(base64Incorrect, 'base64');
      const stringIncorrect = buffIncorrect.toString('utf-8');
      return (
        <button
          key={ index }
          type="button"
          disabled={ disabled }
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.handleClickAnswer }
        >
          {stringIncorrect}
        </button>
      );
    }
  }

  renderQuestion(questions, shuffledArray, questionIndex, over) {
    const base64Category = JSON.stringify(questions[questionIndex].category);
    const buffCategory = Buffer.from(base64Category, 'base64');
    const stringCategory = buffCategory.toString('utf-8');

    const base64Question = JSON.stringify(questions[questionIndex].question);
    const buffQuestion = Buffer.from(base64Question, 'base64');
    const stringQuestion = buffQuestion.toString('utf-8');

    if (questions.length > 1) {
      const { disabled } = this.state;
      return (
        <div id="question-container">
          <h4 data-testid="question-category">{stringCategory}</h4>
          <p data-testid="question-text">{stringQuestion}</p>
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
    const { answered, timer, interval } = this.state;
    if (answered) {
      clearInterval(interval);
      return (
        <h2>{timer}</h2>
      );
    }
    return (
      <h2>{timer}</h2>
    );
  }

  render() {
    const { questions } = this.props;
    const {
      over, shuffledArray, questionIndex, disabled, redirect } = this.state;
    if (redirect) {
      return (<Redirect to="/FeedBack" />);
    }
    return (
      <div>
        <Header />
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
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  updateScoreProp: (points) => dispatch(updateScore(points)),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateScoreProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
