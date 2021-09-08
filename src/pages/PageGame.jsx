import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import NextQuestionButton from '../components/NextQuestionButton';

import Timer from '../components/Timer';

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
    };

    this.questionsSort = this.questionsSort.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleTimeOut = this.handleTimeOut.bind(this);
    this.timeExpired = this.timeExpired.bind(this);
  }

  async componentDidMount() {
    this.handleImg();
  }

  handleImg() {
    const { email } = this.props;
    const path = md5(email).toString();
    this.setState({
      imgPath: `https://www.gravatar.com/avatar/${path}`,
    });
  }

  handleQuestionClick() {
    const { isRunning } = this.state;
    if (isRunning) {
      this.setState({
        styleButtons: {
          correct: { border: '3px solid rgb(6, 240, 15)' },
          incorrect: { border: '3px solid red' },
        },
        isRunning: false,
      });
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
      isRunning: false,
    });
  }

  // references https://flaviocopes.com/how-to-shuffle-array-javascript/
  questionsSort() {
    const minimumIndex = -1;
    let incorrectAnswersIndex = minimumIndex;
    const maxRange = 0.5;
    const { counter, styleButtons, disabledButtons } = this.state;
    const { results } = this.props;
    let allAnswers = [results[counter].correct_answer,
      ...results[counter].incorrect_answers];
    allAnswers = allAnswers.sort(() => Math.random() - maxRange);
    return (
      <div>
        {allAnswers.map((answer) => {
          if (answer === results[counter].correct_answer) {
            return (
              <button
                onClick={ this.handleQuestionClick }
                disabled={ disabledButtons }
                style={ styleButtons.correct }
                className="correct-answer"
                type="button"
                data-testid="correct-answer"
              >
                {answer}
              </button>);
          }
          incorrectAnswersIndex += 1;
          return (
            <button
              onClick={ this.handleQuestionClick }
              disabled={ disabledButtons }
              style={ styleButtons.incorrect }
              className="wrong-answer"
              type="button"
              key={ incorrectAnswersIndex }
              data-testid={ `wrong-answer-${incorrectAnswersIndex}` }
            >
              {answer}
            </button>);
        })}
      </div>
    );
  }

  handleTimeOut() {
    this.setState({ disabledButtons: true });
  }

  render() {
    const { counter, imgPath, isRunning } = this.state;
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
            <p data-testid="header-score">0</p>
          </header>

          <h2>Game</h2>

          <Timer
            isRunning={ isRunning }
            timeExpired={ this.timeExpired }
            instaLose={ this.handleTimeOut }
            counter={ counter }
          />
          { this.questionsSort() }

          <h3 data-testid="question-category">{ results[counter].category }</h3>
          <p data-testid="question-text">{results[counter].question}</p>

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
});

PageGame.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  results: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(PageGame);
