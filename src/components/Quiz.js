import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NextButton from './NextButton';
import { timeoutFalse as actionTimeoutFalse } from '../redux/actions';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      buttonPressed: false,
      showCorrect: false,
    };
    this.changeBorder = this.changeBorder.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  changeBorder() {
    this.setState({
      showCorrect: true,
    });
  }

  handleClickButton({ target }) {
    const { checkQuestion, stopTimer } = this.props;
    const id = target.dataset.testid;
    if (id === 'correct-answer') checkQuestion();
    this.setState({ buttonPressed: true });
    this.changeBorder();
    stopTimer();
  }

  handleClickNext() {
    const { timeoutFalse, startTimer, timeout, nextQuestion } = this.props;
    if (timeout) {
      startTimer(1, true);
    } else { startTimer(0, false); }
    timeoutFalse();
    nextQuestion();
    this.setState({ buttonPressed: false, showCorrect: false });
  }

  render() {
    const { loading, timeout, question, randomIndex } = this.props;
    const { showCorrect, buttonPressed } = this.state;
    if (loading) { return <p>Loading...</p>; }
    const alternatives = question.correct_answer ? [
      ...question.incorrect_answers
        .map((alt, index) => ({ correct: false, alt, index, isCorrect: 'wrong-answer' })),
      { correct: true,
        alt: question.correct_answer,
        isCorrect: 'correct-border' }] : [];
    return (
      <div className="question">
        <h1 data-testid="question-category">{question.category}</h1>
        { question.question
        && <p data-testid="question-text">{question.question}</p> }
        <div className="alternatives">
          {randomIndex.map((index) => {
            if (!alternatives[index]) return;
            const { correct, alt, index: i, isCorrect } = alternatives[index];
            return (
              <button
                disabled={ timeout }
                type="button"
                key={ index }
                data-testid={ correct ? 'correct-answer' : `wrong-answer${i}` }
                className={
                  `quiz-button ${showCorrect ? isCorrect : ''}`
                }
                onClick={ this.handleClickButton }
              >
                {alt}
              </button>
            );
          })}
          { (buttonPressed || timeout)
          && <NextButton onClick={ this.handleClickNext } /> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timeout: state.quiz.timeout,
  loading: state.quiz.loading,
});

const mapDispatchToProps = (dispatch) => ({
  timeoutFalse: () => dispatch(actionTimeoutFalse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

Quiz.propTypes = {
  stopTimer: PropTypes.func.isRequired,
  timeoutFalse: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  checkQuestion: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  timeout: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  randomIndex: PropTypes.arrayOf(PropTypes.number).isRequired,
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
