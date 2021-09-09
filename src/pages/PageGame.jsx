import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import NextQuestionButton from '../components/NextQuestionButton';

import Timer from '../components/Timer';
import Answers from '../components/Answers';
import Score from '../components/Score';

class PageGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      imgPath: '',
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

    this.handleImg = this.handleImg.bind(this);
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.timeExpired = this.timeExpired.bind(this);
    this.getRemainingTime = this.getRemainingTime.bind(this);
    this.getTurnResult = this.getTurnResult.bind(this);
    this.getDifficultyFactor = this.getDifficultyFactor.bind(this);
    this.saveScoreStorage = this.saveScoreStorage.bind(this);
  }

  componentDidMount() {
    this.handleImg();
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
    const { name, imgPath, email } = this.props;
    const { assertions, score } = this.state;

    const data = {
      player: {
        name,
        assertions,
        score,
        email,
        gravatar: imgPath,
      },
    };
    const teste = JSON.stringify(data);
    localStorage.setItem('state', teste);
  }

  handleImg() {
    const { email } = this.props;
    const path = md5(email).toString();
    this.setState({
      imgPath: `https://www.gravatar.com/avatar/${path}`,
    });
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
    }
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

  render() {
    const { counter, imgPath, isRunning, disabledButtons,
      styleButtons, score } = this.state;

    const { results, name } = this.props;

    if (results.length) {
      return (
        <div>
          <header>
            <img
              data-testid="header-profile-picture"
              alt="gravatar img"
              src={ imgPath }
            />
            <p data-testid="header-player-name">{ name }</p>
            <Score score={ score } />
          </header>

          <h2>Game</h2>

          <Timer
            isRunning={ isRunning }
            timeExpired={ this.timeExpired }
            instaLose={ this.handleTimeOut }
            counter={ counter }
            getRemainingTime={ this.getRemainingTime }
          />

          <h3 data-testid="question-category">{ results[counter].category }</h3>
          <p data-testid="question-text">{results[counter].question}</p>
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
    } return <p>Carregando...</p>;
  }
}

const mapStateToProps = (state) => ({
  results: state.myReducer.results,
  name: state.user.name,
  email: state.user.email,
  imgPath: state.user.imgPath,
});

PageGame.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  results: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(PageGame);
