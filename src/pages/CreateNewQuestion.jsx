import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateNewQuestion extends Component {
  constructor(props) {
    super(props);

    this.Answer = this.Answer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.incorrectAnswer = this.incorrectAnswer.bind(this);
  }

  correctAnswer(alternative, index) {
    const { borderColor } = this.props;
    return (
      <button
        className="correta"
        id="correta"
        type="button"
        data-testid="correct-answer"
        key={ index }
        onClick={ borderColor }
      >
        {alternative}
      </button>
    );
  }

  incorrectAnswer(alternative, index) {
    const { borderColor } = this.props;
    return (
      <button
        className="incorreta"
        id="incorreta"
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ index }
        onClick={ borderColor }
      >
        {alternative}
      </button>
    );
  }

  Answer(alternative, correctAnswer, index) {
    for (let i = 0; i < alternative.length; i += 1) {
      if (alternative === correctAnswer) {
        return this.correctAnswer(alternative, index);
      }
    }
    return this.incorrectAnswer(alternative, index);
  }

  render() {
    const { questions, countQuestion } = this.props;
    console.log(questions);

    const questionTrivia = questions.results[countQuestion];
    const alternatives = [
      ...questionTrivia.incorrect_answers,
      questionTrivia.correct_answer,
    ].sort();
    return (
      <div className="center-questoes">
        <span
          className="categoria-pergunta"
          data-testid="question-category"
        >
          {questionTrivia.category}
        </span>
        <div className="caixa-pergunta">
          <h2 data-testid="question-text">{questionTrivia.question}</h2>
        </div>
        <div className="div-alternativas">
          {alternatives.map((alternative, index) => this.Answer(
            alternative, questionTrivia.correct_answer, index,
          ))}
        </div>
      </div>
    );
  }
}

CreateNewQuestion.propTypes = {
  questions: PropTypes.objectOf().isRequired,
  countQuestion: PropTypes.number.isRequired,
  borderColor: PropTypes.func.isRequired,
};

export default CreateNewQuestion;
