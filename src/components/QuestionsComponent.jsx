import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';

import './QuestionsComponent.css';

export default class QuestionsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleClicked = this.handleClicked.bind(this);
    this.renderNextBtn = this.renderNextBtn.bind(this);
    this.handleClickCorrect = this.handleClickCorrect.bind(this);
    this.handleNext = this.handleNext.bind(this);

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
    handleNextQuestion();
    this.setState({ clicked: false });
  }

  renderNextBtn() {
    const { clicked } = this.state;
    if (clicked) {
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
    const { question, buttonDisable, index } = this.props;
    const { clicked } = this.state;
    const four = 4;
    if (index > four) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ buttonDisable }
          className={ clicked && 'correct' }
          onClick={ this.handleClickCorrect }
        >
          {question.correct_answer}
        </button>
        {question.incorrect_answers.map((incorrect, number) => (
          <button
            key={ number }
            data-testid={ `wrong-answer-${number}` }
            type="button"
            disabled={ buttonDisable }
            className={ clicked && 'incorrect' }
            onClick={ this.handleClicked }
          >
            {incorrect}
          </button>
        ))}
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
  index: PropTypes.number.isRequired,
};
