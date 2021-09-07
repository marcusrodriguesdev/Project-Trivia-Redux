import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Multiple extends Component {
  constructor() {
    super();
    this.state = {
      correct: null,
      incorrect: null,
    };
    this.clickClassName = this.clickClassName.bind(this);
  }

  clickClassName() {
    this.setState({ incorrect: 'incorrect', correct: 'correct' });
  }

  shuffle(array) {
    const THREE = 3;
    const arrayCopy = array;
    const random = arrayCopy.splice(Math.floor(Math.random() * THREE));
    return [...random, ...arrayCopy];
  }

  randomAnswer(question) {
    const inicialAnswer = [
      { answer: question.correct_answer,
        index: -1 },
      { answer: question.incorrect_answers[0],
        index: 0 },
      { answer: question.incorrect_answers[1],
        index: 1 },
      { answer: question.incorrect_answers[2],
        index: 2 },
    ];
    return this.shuffle(this.shuffle(this.shuffle(inicialAnswer)));
  }

  renderAnswerButton(answer) {
    const { correct, incorrect } = this.state;
    const ONE_NEGATIVE = -1;
    return (answer.index === ONE_NEGATIVE)
      ? (
        <button
          type="button"
          data-testid="correct-answer"
          className={ correct }
          onClick={ this.clickClassName }
        >
          { answer.answer }
        </button>)
      : (
        <button
          type="button"
          data-testid={ `wrong-answer-${answer.index}` }
          className={ incorrect }
          onClick={ this.clickClassName }
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
          {this.renderAnswerButton(currentQuestionRandom[2])}
          {this.renderAnswerButton(currentQuestionRandom[3])}
        </div>
      </div>
    );
  }
}

Multiple.propTypes = {
  currentQuestion: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf([]).isRequired,
  }).isRequired,
};

export default Multiple;
