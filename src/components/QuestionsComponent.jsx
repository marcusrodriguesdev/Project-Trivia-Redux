import PropTypes from 'prop-types';
import React from 'react';

export default class QuestionsComponent extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <div>
        <p data-testid="question-category">{question[0].category}</p>
        <p data-testid="question-text">{question[0].question}</p>
        <button data-testid="correct-answer" type="button">
          {question[0].correct_answer}
        </button>
        {question[0].incorrect_answers.map((incorrect, index) => (
          <button key={ index } data-testid={ `wrong-answer-${index}` } type="button">
            {incorrect}
          </button>
        ))}
      </div>
    );
  }
}

QuestionsComponent.propTypes = {
  question: PropTypes.arrayOf.isRequired,
};
