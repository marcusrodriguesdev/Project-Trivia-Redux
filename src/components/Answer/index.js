import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { guess as guessAction } from '../../redux/actions/gameActions';

import './style.css';

class Answer extends Component {
  render() {
    const {
      answer,
      index,
      guessed,
      guess,
      timeOver,
      checkAnswer,
      questionInfo,
    } = this.props;
    const { difficulty } = questionInfo;

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
        onClick={ () => {
          guess();
          checkAnswer(answer, difficulty);
        } }
        disabled={ timeOver }
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
  checkAnswer: PropTypes.func.isRequired,
  guess: PropTypes.func.isRequired,
  guessed: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  questionInfo: PropTypes.shape({
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  timeOver: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ game }) => ({
  guessed: game.guessed,
});

const mapDispatchToProps = (dispatch) => ({
  guess: () => dispatch(guessAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
