import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Answer from '../Answer';
import Header from '../Header';

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shuffledAnswers: [],
    };

    this.combineAnswers = this.combineAnswers.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  componentDidMount() {
    this.combineAnswers();
  }

  combineAnswers() {
    const { questionInfo } = this.props;
    const { incorrectAnswers, correctAnswer } = questionInfo;

    const combinedAnswers = [...incorrectAnswers, correctAnswer];

    this.shuffleAnswers(combinedAnswers, correctAnswer);
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
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

Question.propTypes = {
  timeOver: PropTypes.bool.isRequired,
  questionInfo: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Question;
