import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NextQuestionButton from '../components/NextQuestionButton';
import Timer from '../components/Timer';
import Answers from '../components/Answers';
import GameHeader from '../components/GameHeader';
import loadingIcon from '../loading-icon.png';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      disabledButtons: false,
      styleButtons: {
        correct: { border: '' },
        incorrect: { border: '' },
      },
      isRunning: true,
      score: 0,
      timeRemaining: null,
      assertions: 0,
    };

    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.timeExpired = this.timeExpired.bind(this);
    this.getRemainingTime = this.getRemainingTime.bind(this);
    this.getTurnResult = this.getTurnResult.bind(this);
    this.getDifficultyFactor = this.getDifficultyFactor.bind(this);
    this.saveScoreStorage = this.saveScoreStorage.bind(this);
  }

  componentDidUpdate() {
    this.saveScoreStorage();
  }

  getRemainingTime(time) {
    this.setState({ timeRemaining: time });
  }

  getDifficultyFactor(difficulty) {
    const easyFactor = 1;
    const mediumFactor = 2;
    const hardFactor = 3;
    if (difficulty === 'easy') return easyFactor;
    if (difficulty === 'medium') return mediumFactor;
    if (difficulty === 'hard') return hardFactor;
  }

  getTurnResult(className) {
    const { counter, timeRemaining } = this.state;
    const { results } = this.props;
    const minimumPoint = 10;
    if (className === 'correct-answer') {
      const result = minimumPoint + (timeRemaining
        * this.getDifficultyFactor(results[counter].difficulty));
      this.setState((prevState) => ({
        score: prevState.score + result,
        assertions: prevState.assertions + 1,
      }));
    }
  }

  saveScoreStorage() {
    const { name, email } = this.props;
    const { assertions, score } = this.state;

    const data = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(data));
  }

  handleQuestionClick({ target }) {
    const { isRunning } = this.state;
    if (isRunning) {
      this.setState({
        styleButtons: {
          correct: { border: '3px solid rgb(6, 240, 15)' },
          incorrect: { border: '3px solid red' },
        },
        isRunning: false,
      });
      this.getTurnResult(target.className);
    }
  }

  handleNextButton() {
    const { counter } = this.state;
    const { history } = this.props;
    const lastIndexQuestion = 4;
    if (counter < lastIndexQuestion) {
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
        isRunning: true,
        styleButtons: {
          correct: { border: '' },
          incorrect: { border: '' },
        },
        disabledButtons: false,
      }));
      return;
    }
    // https://stackoverflow.com/questions/19635077/adding-objects-to-array-in-localstorage
    const loadRanking = JSON.parse(localStorage.getItem('ranking'));
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const ranking = (loadRanking || []);
    ranking.push(player);
    ranking.sort((player1, player2) => player2.score - player1.score);
    localStorage.setItem('ranking', JSON.stringify(ranking));
    history.push('/feedback');
  }

  decreaseTime() {
    this.setState((prevState) => ({
      timeRemaining: prevState.timeRemaining - 1,
    }));
  }

  timeExpired() {
    this.setState({
      styleButtons: {
        correct: { border: '3px solid rgb(6, 240, 15)' },
        incorrect: { border: '3px solid red' },
      },
      disabledButtons: true,
      isRunning: false,
    });
  }

  // const mockResults = [{
  //   category: 'Token Expirado, favor direcionar para a Home e recarregar a página!',
  //   correct_answer: '',
  //   difficulty: '',
  //   incorrect_answers: [],
  //   question: '',
  //   type: '',
  // }];

  render() {
    const { counter, isRunning, disabledButtons, styleButtons, score } = this.state;
    const { results } = this.props;
    if (results.length) {
      return (
        <div className="quiz-container">
          <GameHeader counter={ counter } />
          <div className="question-container">
            <div className="question">
              <h3 data-testid="question-category" className="category">
                { results[counter].category }
              </h3>
              <div className="question-text">
                <p data-testid="question-text">{results[counter].question}</p>
              </div>
            </div>
          </div>
          <div className="score">
            <p>{`${score} pontos`}</p>
          </div>
          <Timer
            isRunning={ isRunning }
            timeExpired={ this.timeExpired }
            instaLose={ this.handleTimeOut }
            counter={ counter }
            getRemainingTime={ this.getRemainingTime }
          />
          <Answers
            counter={ counter }
            disabledButtons={ disabledButtons }
            styleButtons={ styleButtons }
            handleQuestionClick={ this.handleQuestionClick }
            results={ results }
          />
          { isRunning ? null
            : <NextQuestionButton handleNextButton={ this.handleNextButton } /> }
        </div>
      );
    } return (
      <p className="main-container loading">
        <img src={ loadingIcon } alt="Loading icon" className="loading-icon" />
        Carregando...
      </p>);
  }
}

const mapStateToProps = (state) => ({
  results: state.game.results,
  name: state.user.name,
  email: state.user.email,
  imgPath: state.user.imgPath,
});

Game.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  results: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Game);
