import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import decode from '../GlobalFuncs/DecodeFunc';

class Alternatives extends React.Component {
  displayAnswer(calculateScore) {
    const { questions: { results }, questionNumber } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = results[questionNumber];
    const answers = [correctAnswer, ...incorrectAnswer];
    answers.sort();

    return (
      <>
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
              className={ answer === correctAnswer ? 'correct' : 'incorrect' }
              onClick={ calculateScore }
              name={ answer }
            >
              { decode(answer) }
            </button>
          );
        }) }
      </>
    );
  }

  render() {
    const { loading, calculateScore } = this.props;
    return (
      <div className="alternatives">
        {!loading && this.displayAnswer(calculateScore)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gamePage.questions,
  loading: state.loading.loading,
});

Alternatives.propTypes = {
  calculateScore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  questionNumber: PropTypes.number.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default connect(mapStateToProps)(Alternatives);
