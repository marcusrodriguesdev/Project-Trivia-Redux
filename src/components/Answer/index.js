import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
  render() {
    const { answer, index } = this.props;

    const testId = answer.isCorrect ? 'correct-answer' : `wrong-answer-${index}`;

    return (
      <button data-testid={ testId } type="button" key={ answer }>
        {answer.text}
      </button>
    );
  }
}

Answer.propTypes = {
  answer: PropTypes.shape({
    isCorrect: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Answer;
