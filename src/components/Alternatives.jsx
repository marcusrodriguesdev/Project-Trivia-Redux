import React from 'react';
import PropTypes from 'prop-types';
import '../css/Alternatives.css';

import { connect } from 'react-redux';

class Alternatives extends React.Component {
  showCorrectAnswer() {
    const correct = document.querySelector('.correct');
    correct.className = 'correct correct-answer';

    const incorrect = document.querySelectorAll('.incorrect');
    incorrect.forEach((item) => {
      item.className = 'incorrect incorrect-answer';
      return item;
    });
  }

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
          data-testid="correct-answer"
          className="correct"
          onClick={ this.showCorrectAnswer }
        >
          { correctAnswer }
        </button>
        {incorrectAnswer.map((wrongAnswer, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            id="wrong-answer"
            onClick={ this.showCorrectAnswer }
            className="incorrect"
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
