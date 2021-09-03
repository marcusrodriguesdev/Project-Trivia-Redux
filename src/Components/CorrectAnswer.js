import React from 'react';
import PropTypes from 'prop-types';

class CorrectAnswer extends React.Component {
  render() {
    const { correct } = this.props;

    return (
      <button
        type="submit"
        data-testid="correct-answer"
      >
        {correct}
      </button>
    );
  }
}

CorrectAnswer.propTypes = {
  correct: PropTypes.string.isRequired,
};

export default CorrectAnswer;
