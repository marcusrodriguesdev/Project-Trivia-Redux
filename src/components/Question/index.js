import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Answer from '../Answer';
import Header from '../Header';

class Question extends Component {
  render() {
    const { questionInfo, timeOver } = this.props;
    const { shuffledAnswers } = questionInfo;

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
    shuffledAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default Question;
