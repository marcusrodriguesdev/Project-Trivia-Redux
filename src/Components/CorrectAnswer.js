import React from 'react';
import PropTypes from 'prop-types';

class CorrectAnswer extends React.Component {
  render() {
    const { correct, handleClick, btnClass, disabled } = this.props;

    return (
      <button
        type="submit"
        data-testid="correct-answer"
        className={ btnClass }
        onClick={ handleClick }
        disabled={ disabled }
      >
        {correct}
      </button>
    );
  }
}

CorrectAnswer.propTypes = {
  disabled: PropTypes.bool.isRequired,
  correct: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CorrectAnswer;
