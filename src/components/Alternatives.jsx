import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Alternatives extends React.Component {
  displayAnswer() {
    const { questions: { results }, seconds, index: counter } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = results[counter];
    return (
      <div>
        <button
          type="button"
          data-testid="correct-answer"
          disabled={ seconds === 0 }
        >
          { correctAnswer }
        </button>
        {incorrectAnswer.map((wrongAnswer, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            disabled={ seconds === 0 }
          >
            { wrongAnswer }
          </button>))}
      </div>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        {!loading && this.displayAnswer()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gamePage.questions,
  loading: state.loading.loading,
  index: state.gamePage.index,
});

Alternatives.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  seconds: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Alternatives);
