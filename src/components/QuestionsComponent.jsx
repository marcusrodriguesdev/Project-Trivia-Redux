import PropTypes from 'prop-types';
import React from 'react';

import './QuestionsComponent.css';

export default class QuestionsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleClicked = this.handleClicked.bind(this);

    this.state = {
      clicked: false,
    };
  }

  handleClicked() {
    this.setState({ clicked: true });
  }

  render() {
    const { question, buttonDisable } = this.props;
    const { clicked } = this.state;
    return (
      <div>
        <p data-testid="question-category">{question[0].category}</p>
        <p data-testid="question-text">{question[0].question}</p>
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ buttonDisable }
          className={ clicked && 'correct' }
          onClick={ this.handleClicked }
        >
          {question[0].correct_answer}
        </button>
        {question[0].incorrect_answers.map((incorrect, index) => (
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
      </div>
    );
  }
}

QuestionsComponent.propTypes = {
  question: PropTypes.arrayOf.isRequired,
  buttonDisable: PropTypes.bool.isRequired,
};
