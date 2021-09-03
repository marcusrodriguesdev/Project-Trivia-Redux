import React from 'react';
import PropTypes from 'prop-types';
import '../css/Alternatives.css';

import { connect } from 'react-redux';

class Alternatives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: false,
      questionNumber: 0,
    };
    this.hideNextButton = this.hideNextButton.bind(this);
    this.showCorrectAnswer = this.showCorrectAnswer.bind(this);
    this.displayAnswer = this.displayAnswer.bind(this);
    this.showNextQuestion = this.showNextQuestion.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }

  hideNextButton() {
    this.setState((previousValue) => ({
      next: !previousValue.next,
    }));
  }

  showNextQuestion() {
    this.hideNextButton();
    this.removeClass();
    // this.displayAnswer();
    this.setState((prev) => ({
      questionNumber: prev.questionNumber + 1,
    }));
  }

  showCorrectAnswer() {
    const correct = document.querySelector('.correct');
    correct.className = 'correct correct-answer';

    const incorrect = document.querySelectorAll('.incorrect');
    incorrect.forEach((item) => {
      item.className = 'incorrect incorrect-answer';
      return item;
    });
    this.hideNextButton();
  }

  removeClass() {
    const correct = document.querySelector('.correct');
    correct.className = 'correct default';

    const incorrect = document.querySelectorAll('.incorrect');
    incorrect.forEach((item) => {
      item.className = 'incorrect default';
      return item;
    });
    // this.hideNextButton();
  }

  displayAnswer() {
    const { questions: { results } } = this.props;
    const { questionNumber } = this.state;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = results[questionNumber];
    console.log(results);
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
    const { next } = this.state;
    const { loading } = this.props;
    return (
      <div>
        {!loading && this.displayAnswer()}
        <div>
          { next && (
            <button
              type="button"
              onClick={ this.showNextQuestion }
              data-testid="btn-next"
            >
              Proxima
            </button>) }
        </div>
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

// commit
