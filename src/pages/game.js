import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setLocalStorageThunk, setScore as setScoreAction } from '../actions';

import '../App.css';
import '../gameButton.css';
import HeaderInfo from '../components/HeaderInfo';
import AnswersId from '../components/AnswersId';

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      tighten: false,
      id: 0,
      timer: 30,
      answers: [],
    };

    this.fetchAPI = this.fetchAPI.bind(this);
    this.clickingState = this.clickingState.bind(this);
    this.changingId = this.changingId.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    this.handleIncorrectAnswer = this.handleIncorrectAnswer.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
    const { setLocalStorage } = this.props;
    this.setTimer();
    setLocalStorage();
  }

  componentDidUpdate(_, prevState) {
    this.setTimerLimit(prevState);
  }

  setTimerLimit(prevState) {
    const { tighten } = this.state;
    const timeLimit = 1;
    if (prevState.timer === timeLimit && !tighten) {
      this.clickingState();
    }
  }

  setTimer() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  async fetchAPI() {
    const response = await fetch('https://opentdb.com/api.php?amount=5');
    const data = await response.json();

    const incorrectAnswers = data.results[0].incorrect_answers;
    const correctAswer = data.results[0].correct_answer;
    const allAnswers = [...incorrectAnswers, correctAswer];

    this.setState({
      data: data.results,
      answers: allAnswers.sort(),
    });
    return data;
  }

  clickingState() {
    this.setState({
      tighten: true,
    });
    clearInterval(this.intervalId);
  }

  changingId() {
    const { id, data } = this.state;
    const { history } = this.props;
    const soma = id + 1;
    if (soma < data.length) {
      const incorrectAnswers = data[soma].incorrect_answers;
      const correctAswer = data[soma].correct_answer;
      const allAnswers = [...incorrectAnswers, correctAswer];
      this.setState({
        id: soma,
        tighten: false,
        answers: allAnswers.sort(),
        timer: 30,
      });
      this.setTimer();
    } else {
      history.push('/feedback');
    }
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
    this.clickingState();
  }

  handleIncorrectAnswer() {
    clearInterval(this.intervalId);
    this.setState({
      timer: 0,
    });
    this.clickingState();
  }

  render() {
    const { data, answers, timer, tighten, id } = this.state;
    const loading = <div className="loading">Loading</div>;
    const buttonNext = (
      <button data-testid="btn-next" type="button" onClick={ this.changingId }>
        Próximo
      </button>
    );

    if (data === '' || answers === []) {
      return loading;
    }
    return (
      <div className="App">
        <HeaderInfo />
        Tela de jogo
        <div className={ tighten ? 'show' : 'question-board' }>
          <h1 data-testid="question-category">{data[id].category}</h1>
          <h2 data-testid="question-text">{data[id].question}</h2>
          {answers.map((answer, index) => (
            <AnswersId
              key={ index }
              answer={ answer }
              index={ index }
              data={ data }
              id={ id }
              handleIncorrectAnswer={ this.handleIncorrectAnswer }
              handleCorrectAnswer={ this.handleCorrectAnswer }
              timer={ timer }
            />)) }
          <div>
            {timer}
          </div>
          { tighten && buttonNext }
        </div>
      </div>
    );
  }
}

game.propTypes = {
  setScore: PropTypes.func.isRequired,
  setLocalStorage: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispath) => ({
  setScore: (score) => dispath(setScoreAction(score)),
  setLocalStorage: () => dispath(setLocalStorageThunk()),
});

export default connect(null, mapDispatchToProps)(game);
