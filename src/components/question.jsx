import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './quest.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      correct: null,
      incorrect: null,
    };
    this.handleClickClassName = this.handleClickClassName.bind(this);
  }

  handleClickClassName() {
    this.setState({ incorrect: 'incorrect', correct: 'correct' });
  }

  render() {
    const { correct, incorrect } = this.state;
    const { answer } = this.props;
    return (
      <div>
        <p data-testid="question-category">{answer[0].category}</p>
        <p data-testid="question-text">{answer[0].question}</p>
        <button
          className={ correct }
          onClick={ this.handleClickClassName }
          data-testid="correct-answer"
          type="button"
        >
          {answer[0].correct_answer}
        </button>
        {answer[0].incorrect_answers
          .map((element, index) => (
            <div key={ index }>
              <button
                className={ incorrect }
                onClick={ this.handleClickClassName }
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
              >
                {element}
              </button>
            </div>
          ))}
      </div>
    );
  }
}
Questions.propTypes = {
  answer: PropTypes.string.isRequired,
};
export default Questions;
