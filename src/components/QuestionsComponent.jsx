import PropTypes from 'prop-types';
import React from 'react';

import './QuestionsComponent.css';

export default class QuestionsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleClicked = this.handleClicked.bind(this);
    this.renderNextBtn = this.renderNextBtn.bind(this);
    this.handleClickCorrect = this.handleClickCorrect.bind(this);

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

  renderNextBtn() {
    const { clicked } = this.state;
    if (clicked) {
      return (
        <button
          data-testid="btn-next"
          type="button"
        >
          Próxima
        </button>
      );
    }
  }

  render() {
    const { question, buttonDisable } = this.props;
    const { clicked } = this.state;
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
        {question.incorrect_answers.map((incorrect, index) => (
          <button
            key={ index }
            data-testid={ `wrong-answer-${index}` }
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
  question: PropTypes.objectOf.isRequired,
  handleClick: PropTypes.func.isRequired,
  buttonDisable: PropTypes.bool.isRequired,
};
