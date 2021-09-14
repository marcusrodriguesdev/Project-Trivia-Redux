import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Answer from '../Answer';
import Timer from '../Timer';
import Button from '../Button';

import {
  increaseScore,
  nextQuestion as nextQuestionAction,
  setTime,
  increaseAssertions as increaseAssertionsAction,
} from '../../redux/actions/gameActions';

import './style.css';

const dificulties = {
  easy: 1,
  medium: 2,
  hard: 3,
};

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeOver: false,
    };

    this.setTimeOver = this.setTimeOver.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  setTimeOver() {
    this.setState({
      timeOver: true,
    });
  }

  handleNextQuestion() {
    const DEFAULT_TIME = 3000;

    const {
      history,
      nextQuestion,
      currentQuestion,
      totalQuestions,
      setTimeRedux,
    } = this.props;

    if (currentQuestion < totalQuestions - 1) {
      nextQuestion();
      setTimeRedux(DEFAULT_TIME);

      this.setState({
        timeOver: false,
      });
    } else {
      history.push('/feedback');
    }
  }

  checkAnswer({ text }, dificulty) {
    const { questionInfo, time, increaseGlobalScore, increaseAssertions } = this.props;

    const { correctAnswer } = questionInfo;
    const BASE_SCORE = 10;

    if (text === correctAnswer) {
      const score = BASE_SCORE + (time / 100).toFixed(0) * dificulties[dificulty];
      increaseGlobalScore(score);
      increaseAssertions();
    }
  }

  render() {
    const { guessed, currentQuestion, questionInfo } = this.props;
    const { shuffledAnswers } = questionInfo;
    const { timeOver } = this.state;

    return (
      <div className="question">
        <div className="question-header">
          <div className="question-info">
            <p data-testid="question-category">{`Category: ${questionInfo.category}`}</p>
            <p className="difficulty">
              {`Difficulty: ${dificulties[questionInfo.difficulty]}`}
            </p>
          </div>
          <p>{`${currentQuestion + 1}/5`}</p>
        </div>
        <Timer key={ currentQuestion } setTimeOver={ this.setTimeOver } />
        <p data-testid="question-text" className="question-text">
          {questionInfo.question}
        </p>
        <div className="answers">
          {shuffledAnswers.map((answer, index) => (
            <Answer
              key={ answer.text }
              timeOver={ timeOver }
              answer={ answer }
              index={ index }
              checkAnswer={ this.checkAnswer }
              questionInfo={ questionInfo }
            />
          ))}
        </div>
        <Button
          type="button"
          onClick={ this.handleNextQuestion }
          text="Next"
          className="next-button"
          visibility={ guessed || timeOver ? 'visible' : 'hidden' }
        />
      </div>
    );
  }
}

Question.propTypes = {
  guessed: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  increaseGlobalScore: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  setTimeRedux: PropTypes.func.isRequired,
  increaseAssertions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questionInfo: PropTypes.shape({
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    shuffledAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

const mapStateToProps = ({ game }) => ({
  time: game.time,
  guessed: game.guessed,
  currentQuestion: game.currentQuestion,
  totalQuestions: game.totalQuestions,
});

const mapDispatchToProps = (dispatch) => ({
  increaseGlobalScore: (amount) => dispatch(increaseScore(amount)),
  increaseAssertions: () => dispatch(increaseAssertionsAction()),
  nextQuestion: () => dispatch(nextQuestionAction()),
  setTimeRedux: (time) => dispatch(setTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
