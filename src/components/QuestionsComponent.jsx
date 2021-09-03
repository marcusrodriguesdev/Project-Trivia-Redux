import PropTypes from 'prop-types';
import React from 'react';

import './QuestionsComponent.css';

export default class QuestionsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleClicked = this.handleClicked.bind(this);
    this.renderNextBtn = this.renderNextBtn.bind(this);

    this.state = {
      clicked: false,
    };
  }

  handleClicked() {
    this.setState({ clicked: true });
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
    const { clicked } = this.state;
    const { question } = this.props;
    return (
      <div>
        <p data-testid="question-category">{question[0].category}</p>
        <p data-testid="question-text">{question[0].question}</p>
        <button
          data-testid="correct-answer"
          type="button"
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
  question: PropTypes.arrayOf.isRequired,
};
