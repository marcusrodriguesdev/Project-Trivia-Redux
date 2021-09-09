import React from 'react';
import PropTypes from 'prop-types';
import '../css/Alternatives.css';

import { connect } from 'react-redux';
import decode from '../GlobalFuncs/DecodeFunc';

class Alternatives extends React.Component {
  displayAnswer(applyColor) {
    const { questions: { results }, seconds, questionNumber, next } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = results[questionNumber];
    const answers = [correctAnswer, ...incorrectAnswer];
    answers.sort();

    return (
      <div>
        {answers.map((answer, index, array) => {
          const wrongIndex = array.filter((alternative) => (
            alternative !== correctAnswer
          ));

          return (
            <button
              key={ index }
              type="button"
              data-testid={ answer === correctAnswer ? 'correct-answer'
                : `wrong-answer-${wrongIndex.indexOf(answer)}` }
              disabled={ seconds === 0 || next }
              className={ answer === correctAnswer ? 'correct' : 'incorrect' }
              onClick={ applyColor }
              name={ answer }
            >
              { decode(answer) }
            </button>
          );
        }) }
      </div>
    );
  }

  render() {
    const { loading, applyColor } = this.props;
    return (
      <div>
        {!loading && this.displayAnswer(applyColor)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gamePage.questions,
  loading: state.loading.loading,
});

Alternatives.propTypes = {
  applyColor: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  questionNumber: PropTypes.number.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  seconds: PropTypes.number.isRequired,
  next: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Alternatives);
