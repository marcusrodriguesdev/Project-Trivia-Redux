import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Answer extends Component {
  render() {
    const { answer, index, guessed, handleGuess } = this.props;

    const testId = answer.isCorrect
      ? 'correct-answer'
      : `wrong-answer-${index}`;

    let className = '';

    if (guessed) {
      className = answer.isCorrect ? 'correct' : 'incorrect';
    }

    return (
      <button
        data-testid={ testId }
        type="button"
        key={ answer }
        className={ className }
        onClick={ handleGuess }
      >
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
  guessed: PropTypes.bool.isRequired,
  handleGuess: PropTypes.func.isRequired,
};

export default Answer;
