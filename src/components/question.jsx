import React from 'react';
import PropTypes from 'prop-types';
import './question.css';

class question extends React.Component {
  constructor() {
    super();
    this.state = {
      answerSelected: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      answerSelected: true,
    });
  }

  render() {
    const { questions } = this.props;
    const { answerSelected } = this.state;
    return (
      <div>
        <fieldset>
          <h1 data-testid="question-category">
            { questions[0].category }
          </h1>
          <h2 data-testid="question-text">
            { questions[0].question }
          </h2>
          <ol>
            <li classNme="incorrect">
              {(questions[0].incorrect_answers).map((incorrect, index) => (
                <button
                  type="button"
                  className={ answerSelected && 'incorrect' }
                  key={ index }
                  data-testid={ `wrong-answer-${index}` }
                  name={ incorrect }
                  onClick={ this.handleClick }
                >
                  { incorrect }
                </button>
              ))}
            </li>
            <li>
              <button
                type="button"
                className={ answerSelected && 'correct' }
                data-testid="correct-answer"
                onClick={ this.handleClick }
              >
                { questions[0].correct_answer }
              </button>
            </li>
          </ol>
        </fieldset>
      </div>
    );
  }
}
question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default question;
