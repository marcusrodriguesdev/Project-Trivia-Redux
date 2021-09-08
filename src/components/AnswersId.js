import React from 'react';
import PropTypes from 'prop-types';

class AnswersId extends React.Component {
  render() {
    const {
      data,
      id,
      answer,
      index,
      handleIncorrectAnswer,
      handleCorrectAnswer,
      timer,
    } = this.props;
    return (
      answer === data[id].correct_answer
        ? (
          <button
            className="correct"
            type="button"
            data-testid="correct-answer"
            disabled={ timer === 0 }
            onClick={ () => {
              handleCorrectAnswer(data[id].difficulty);
            } }
          >
            { answer }
          </button>
        )
        : (
          <button
            className="wrong"
            type="button"
            data-testid={ `wrong-answer${index}` }
            disabled={ timer === 0 }
            onClick={ () => {
              handleIncorrectAnswer();
            } }
          >
            { answer }
          </button>
        )
    );
  }
}

AnswersId.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleIncorrectAnswer: PropTypes.func.isRequired,
  handleCorrectAnswer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

export default AnswersId;
