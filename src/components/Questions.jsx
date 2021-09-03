import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Questions extends Component {
  render() {
    const { resp } = this.props;
    return (
      <div>
        <p data-testid="question-category">{resp[0].category}</p>
        <p data-testid="question-text">{resp[0].question}</p>
        <button
          data-testid="correct-answer"
          type="button"
        >
          {resp[0].correct_answer}
        </button>
        {resp[0].incorrect_answers
          .map((element, index) => (
            <div key={ index }>
              <button
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
  resp: PropTypes.string.isRequired,
};

export default Questions;
