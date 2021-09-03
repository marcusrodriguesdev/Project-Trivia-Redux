import PropTypes from 'prop-types';
import React from 'react';

export default class QuestionsComponent extends React.Component {
  render() {
    const { question, handleClick } = this.props;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <button data-testid="correct-answer" type="button" onClick={ handleClick }>
          {question.correct_answer}
        </button>
        {question.incorrect_answers.map((incorrect, index) => (
          <button key={ index } data-testid={ `wrong-answer-${index}` } type="button">
            {incorrect}
          </button>
        ))}
      </div>
    );
  }
}

QuestionsComponent.propTypes = {
  question: PropTypes.objectOf.isRequired,
  handleClick: PropTypes.func.isRequired,
};
