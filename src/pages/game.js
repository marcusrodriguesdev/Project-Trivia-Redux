import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setLocalStorageThunk, setScore as setScoreAction } from '../actions';

import '../App.css';
import HeaderInfo from '../components/HeaderInfo';

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      timer: 30,
      answers: [],
    };

    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    this.handleIncorrectAnswer = this.handleIncorrectAnswer.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
    const { setLocalStorage } = this.props;
    const miliseconds = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, miliseconds);
    setLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setTimerLimit(prevState);
  }

  setTimerLimit(prevState) {
    const timeLimit = 0;
    if (prevState.timer === timeLimit) {
      this.setState({ timer: 0 });
    }
  }

  async fetchAPI() {
    const response = await fetch('https://opentdb.com/api.php?amount=5');
    const data = await response.json();

    const incorrectAnswers = data.results[0].incorrect_answers;
    const correctAswer = data.results[0].correct_answer;
    const allAnswers = [...incorrectAnswers, correctAswer];

    this.setState({
      data: data.results[0],
      answers: allAnswers.sort(),
    });
    return data;
  }

  handleCorrectAnswer(difficulty) {
    const DEFAULT_POINTS = 10;
    const { setScore, setLocalStorage } = this.props;
    const { timer } = this.state;
    const difficultyPoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const score = DEFAULT_POINTS + (difficultyPoints[difficulty] * timer);

    setScore(score);
    setLocalStorage();
    clearInterval(this.intervalId);
    this.setState({
      timer: 0,
    });
  }

  handleIncorrectAnswer() {
    clearInterval(this.intervalId);
    this.setState({
      timer: 0,
    });
  }

  render() {
    const { data, answers, timer } = this.state;
    const loading = <div className="loading">Loading</div>;

    if (data === '' || answers === []) {
      return loading;
    }
    return (
      <div className="App">
        <HeaderInfo />
        Tela de jogo
        <div className="question-board">
          <h1 data-testid="question-category">{data.category}</h1>
          <h2 data-testid="question-text">{data.question}</h2>
          {answers.map((answer, index) => (
            answer === data.correct_answer
              ? (
                <button
                  key={ index }
                  type="button"
                  data-testid="correct-answer"
                  disabled={ timer === 0 }
                  onClick={ () => this.handleCorrectAnswer(data.difficulty) }
                >
                  { answer }
                </button>
              )
              : (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer${index}` }
                  disabled={ timer === 0 }
                  onClick={ this.handleIncorrectAnswer }
                >
                  { answer }
                </button>
              )
          ))}
          <div>
            { timer }
          </div>
        </div>
      </div>
    );
  }
}

game.propTypes = {
  setScore: PropTypes.func.isRequired,
  setLocalStorage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispath) => ({
  setScore: (score) => dispath(setScoreAction(score)),
  setLocalStorage: () => dispath(setLocalStorageThunk()),
});

export default connect(null, mapDispatchToProps)(game);
