import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answers extends Component {
  constructor() {
    super();
    this.state = {
      sortedAnswers: [],
    };
    this.questionsSort = this.questionsSort.bind(this);
  }

  componentDidMount() {
    this.questionsSort();
  }

  componentDidUpdate(prevProps) {
    const { counter } = this.props;
    if (prevProps.counter !== counter) this.questionsSort();
  }

  questionsSort() {
    const maxRange = 0.5;
    const { results, counter } = this.props;
    let sortedAnswers = [results[counter].correct_answer,
      ...results[counter].incorrect_answers];
    sortedAnswers = sortedAnswers.sort(() => Math.random() - maxRange);
    this.setState({ sortedAnswers });
  }

  render() {
    const { results, counter, disabledButtons,
      styleButtons, handleQuestionClick } = this.props;

    const { sortedAnswers } = this.state;

    const minimumIndex = -1;
    let incorrectAnswersIndex = minimumIndex;

    return (
      <div className="answers-container">
        {sortedAnswers.map((answer) => {
          if (answer === results[counter].correct_answer) {
            return (
              <button
                key={ answer }
                disabled={ disabledButtons }
                style={ styleButtons.correct }
                className="correct-answer"
                type="button"
                data-testid="correct-answer"
                onClick={ handleQuestionClick }
              >
                {answer}
              </button>);
          }
          incorrectAnswersIndex += 1;
          return (
            <button
              onClick={ handleQuestionClick }
              disabled={ disabledButtons }
              style={ styleButtons.incorrect }
              className="wrong-answer"
              type="button"
              key={ incorrectAnswersIndex }
              data-testid={ `wrong-answer-${incorrectAnswersIndex}` }
            >
              {answer}
            </button>);
        })}
      </div>
    );
  }
}

export default Answers;

Answers.propTypes = {
  counter: PropTypes.number,
  results: PropTypes.array,
}.isRequired;
