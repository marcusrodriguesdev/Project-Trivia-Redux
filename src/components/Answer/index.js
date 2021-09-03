import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { guess as guessAction } from '../../redux/actions/gameActions';

import './style.css';

class Answer extends Component {
  render() {
    const { answer, index, guessed, guess, timeOver } = this.props;

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
        onClick={ () => guess() }
        disabled={ timeOver }
      >
        {answer.text}
      </button>
    );
  }
}

Answer.propTypes = {
  timeOver: PropTypes.bool.isRequired,
  answer: PropTypes.shape({
    isCorrect: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  guessed: PropTypes.bool.isRequired,
  guess: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game }) => ({
  guessed: game.guessed,
});

const mapDispatchToProps = (dispatch) => ({
  guess: () => dispatch(guessAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
