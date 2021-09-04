import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Answer from '../Answer';
import Header from '../Header';
import { increaseScore } from '../../redux/actions/gameActions';

const dificulties = {
  easy: 1,
  medium: 2,
  hard: 3,
};

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shuffledAnswers: [],
    };

    this.combineAnswers = this.combineAnswers.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    this.combineAnswers();
  }

  combineAnswers() {
    const { questionInfo } = this.props;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = questionInfo;

    const combinedAnswers = [...incorrectAnswers, correctAnswer];

    this.shuffleAnswers(combinedAnswers, correctAnswer);
  }

  checkAnswer({ text }, dificulty) {
    const {
      questionInfo,
      time,
      increaseGlobalScore,
    } = this.props;
    const { correct_answer: correctAnswer } = questionInfo;
    const baseScore = 10;

    if (text === correctAnswer) {
      const score = baseScore + time * dificulties[dificulty];
      increaseGlobalScore(score);
      const local = JSON.parse(window.localStorage.getItem('state'));
      local.player.score = score;
      window.localStorage.setItem('state', JSON.stringify(local));
    }
  }

  shuffleAnswers(answers, correctAnswer) {
    const selectedAnswers = {};
    const tempAnswers = [];

    for (let i = 0; i < answers.length; i += 1) {
      let randomIndex = this.pickRandomIndex(answers.length);

      while (selectedAnswers[randomIndex]) {
        randomIndex = this.pickRandomIndex(answers.length);
      }

      selectedAnswers[randomIndex] = true;

      const pickedAnswer = answers[randomIndex];

      tempAnswers.push({
        isCorrect: pickedAnswer === correctAnswer,
        text: pickedAnswer,
      });
    }

    this.setState({
      shuffledAnswers: tempAnswers,
    });
  }

  pickRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  render() {
    const { questionInfo, timeOver } = this.props;
    const { shuffledAnswers } = this.state;

    return (
      <>
        <Header />
        <div className="question">
          <p data-testid="question-category">{`Category: ${questionInfo.category}`}</p>
          <p data-testid="question-text">{`Question: ${questionInfo.question}`}</p>
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
        </div>
      </>
    );
  }
}

Question.propTypes = {
  increaseGlobalScore: PropTypes.func.isRequired,
  questionInfo: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
  time: PropTypes.number.isRequired,
  timeOver: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  time: state.game.time,
});

const mapDispatchToProps = (dispatch) => ({
  increaseGlobalScore: (amount) => dispatch(increaseScore(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
