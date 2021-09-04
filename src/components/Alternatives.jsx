import React from 'react';
import PropTypes from 'prop-types';
import '../css/Alternatives.css';

import { connect } from 'react-redux';

class Alternatives extends React.Component {
  displayAnswer(applyColor) {
    const { questions: { results }, questionNumber } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = results[questionNumber];

    return (
      <div>
        <button
          type="button"
          data-testid="correct-answer"
          className="correct"
          onClick={ applyColor }
        >
          { correctAnswer }
        </button>

        {incorrectAnswer.map((wrongAnswer, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            id="wrong-answer"
            onClick={ applyColor }
            className="incorrect"
          >
            { wrongAnswer }
          </button>))}
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
};

export default connect(mapStateToProps)(Alternatives);
