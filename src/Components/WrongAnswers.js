import React from 'react';
import PropTypes from 'prop-types';

class WrongAnswers extends React.Component {
  render() {
    const { answers, index } = this.props;
    return (
      <button
        type="submit"
        data-testid={ `wrong-answer-${index}` }
      >
        {answers}
      </button>
    );
  }
}

WrongAnswers.propTypes = {
  answers: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default WrongAnswers;
