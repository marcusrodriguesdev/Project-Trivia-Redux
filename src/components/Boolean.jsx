import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Boolean extends Component {
  shuffle(array) {
    const ONE = 1;
    const arrayCopy = array;
    const random = arrayCopy.splice(Math.floor(Math.random() * ONE));
    return [...random, ...arrayCopy];
  }

  randomAnswer(question) {
    const inicialAnswer = [
      { answer: question.correct_answer,
        index: -1 },
      { answer: question.incorrect_answers[0],
        index: 0 },
    ];
    return this.shuffle(this.shuffle(this.shuffle(inicialAnswer)));
  }

  renderAnswerButton(answer) {
    const ONE_NEGATIVE = -1;
    return (answer.index === ONE_NEGATIVE)
      ? (<button type="button" data-testid="correct-answer">{ answer.answer }</button>)
      : (
        <button
          type="button"
          data-testid={ `wrong-answer-${answer.index}` }
        >
          { answer.answer }
        </button>);
  }

  render() {
    const { currentQuestion } = this.props;
    const { category, question } = currentQuestion;
    const currentQuestionRandom = this.randomAnswer(currentQuestion);
    return (
      <div>
        <p>
          Categoria:
          <span data-testid="question-category">{ category }</span>
        </p>
        <p>
          Pergunta:
          <span data-testid="question-text">{ question }</span>
        </p>
        <div>
          {this.renderAnswerButton(currentQuestionRandom[0])}
          {this.renderAnswerButton(currentQuestionRandom[1])}
        </div>
      </div>
    );
  }
}

Boolean.propTypes = {
  currentQuestion: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf([]).isRequired,
  }).isRequired,
};

export default Boolean;
