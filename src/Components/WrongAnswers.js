import React from 'react';
import PropTypes from 'prop-types';

class WrongAnswers extends React.Component {
  render() {
    const { answers, index, handleClick, btnClass, disabled } = this.props;
    return (
      <button
        type="submit"
        data-testid={ `wrong-answer-${index}` }
        className={ btnClass }
        onClick={ handleClick }
        disabled={ disabled }
      >
        {answers}
      </button>
    );
  }
}

WrongAnswers.propTypes = {
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  answers: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default WrongAnswers;
