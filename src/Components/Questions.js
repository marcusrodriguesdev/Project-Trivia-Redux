import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const {
      category,
      correct,
      difficulty,
      incorrect,
      question,
      type,
    } = this.props;
    const { handleSubmit } = this;

    return (
      <main>
        <h1 data-testid="question-category">{category}</h1>
        <p data-testid="question-text">{question}</p>
        <p>{difficulty}</p>
        <button
          type="submit"
          data-testid="correct-answer"
          onClick={ handleSubmit }
        >
          {correct}

        </button>
        <button
          type="submit"
          data-testid={ `wrong-answer-${incorrect}` }
          onClick={ handleSubmit }
        >
          {incorrect}

        </button>
        <p>{type}</p>
      </main>
    );
  }
}

Questions.propTypes = {
  category: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
  question: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default (Questions);
