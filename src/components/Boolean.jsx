import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Boolean extends Component {
  constructor() {
    super();
    this.state = {
      correct: null,
      incorrect: null,
    };
    this.clickClassName = this.clickClassName.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  clickClassName() {
    const { endRound } = this.props;
    this.setState({ incorrect: 'incorrect', correct: 'correct' });
    endRound();
  }

  nextButton() {
    const { isEnabled, nextRound } = this.props;
    if (!isEnabled) {
      return (
        <button data-testid="btn-next" type="button" onClick={ () => nextRound() }>
          {/* <button type="button" onClick={ () => console.log('nextButton clicked!') }> */}
          Próxima
        </button>
      );
    }
  }

  renderAnswerButton(answer) {
    const { correct, incorrect } = this.state;
    const ONE_NEGATIVE = -1;
    const { isEnabled } = this.props;
    return (answer.index === ONE_NEGATIVE)
      ? (
        <button
          type="button"
          data-testid="correct-answer"
          disabled={ !isEnabled }
          className={ correct }
          onClick={ this.clickClassName }
        >
          { answer.answer }
        </button>)
      : (
        <button
          type="button"
          data-testid={ `wrong-answer-${answer.index}` }
          disabled={ !isEnabled }
          className={ incorrect }
          onClick={ this.clickClassName }
        >
          { answer.answer }
        </button>);
  }

  render() {
    const { currentQuestion, category, question } = this.props;
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
          {this.renderAnswerButton(currentQuestion[0])}
          {this.renderAnswerButton(currentQuestion[1])}
        </div>
        { this.nextButton() }

      </div>
    );
  }
}

Boolean.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  currentQuestion: PropTypes.arrayOf({}).isRequired,
  isEnabled: PropTypes.bool.isRequired,
  endRound: PropTypes.func.isRequired,
};

export default Boolean;
