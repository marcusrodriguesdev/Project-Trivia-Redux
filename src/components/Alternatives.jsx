import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Alternatives extends React.Component {
  displayAnswer() {
    const { questions: { results } } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = results[0];
    return (
      <div>
        <button
          type="button"
          key="alternative"
          data-testid="correct-answer"
        >
          { correctAnswer }
        </button>
        {incorrectAnswer.map((wrongAnswer, index) => (
          <button
            type="button"
            key="alternative"
            data-testid={ `wrong-answer-${index}` }
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
});

Alternatives.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default connect(mapStateToProps)(Alternatives);
