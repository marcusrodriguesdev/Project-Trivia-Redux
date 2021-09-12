import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './QuestionsComponent.css';

export default class QuestionsComponent extends Component {
  constructor(props) {
    super(props);

    this.handleClicked = this.handleClicked.bind(this);
    this.renderNextBtn = this.renderNextBtn.bind(this);
    this.handleClickCorrect = this.handleClickCorrect.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);

    this.state = {
      clicked: false,
    };
  }

  handleClicked() {
    this.setState({ clicked: true });
  }

  handleClickCorrect() {
    const { handleClick } = this.props;
    this.handleClicked();
    handleClick();
  }

  handleNext() {
    const { handleNextQuestion } = this.props;
    this.setState({ clicked: false });
    handleNextQuestion();
  }

  handleAnswers() {
    const { clicked } = this.state;
    const { buttonDisable, answerMap, question } = this.props;
    return answerMap.map((answer, index) => {
      if (answer === question.correct_answer) {
        return (
          <button
            key={ index }
            data-testid="correct-answer"
            type="button"
            disabled={ buttonDisable }
            onClick={ this.handleClickCorrect }
            className={ clicked && 'correct' }
          >
            {answerMap[index]}
          </button>
        );
      }
      return (
        <button
          key={ index }
          data-testid={ `wrong-answer-${index}` }
          type="button"
          disabled={ buttonDisable }
          onClick={ this.handleClicked }
          className={ clicked && 'incorrect' }
        >
          {answerMap[index]}
        </button>
      );
    });
  }

  renderNextBtn() {
    const { clicked } = this.state;
    const { timer } = this.props;
    if (clicked || timer === 0) {
      return (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.handleNext }
        >
          Próxima
        </button>
      );
    }
  }

  render() {
    const { question } = this.props;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        {this.handleAnswers()}
        {this.renderNextBtn()}
      </div>
    );
  }
}

QuestionsComponent.propTypes = {
  buttonDisable: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  question: PropTypes.objectOf().isRequired,
  timer: PropTypes.number.isRequired,
  answerMap: PropTypes.arrayOf().isRequired,
};
