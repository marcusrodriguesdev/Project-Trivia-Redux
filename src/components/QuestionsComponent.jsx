import React from 'react';
import PropTypes from 'prop-types';

import './Questions.css';
import ConfigButton from './ConfigButton';

class QuestionsComponent extends React.Component {
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
                <ConfigButton
                  key={ index }
                  className={ answerSelected && 'incorrect' }
                  test={ `wrong-answer-${index}` }
                  name={ incorrect }
                  onClick={ this.handleClick }
                />
              ))}
            </li>
            <li>
              <ConfigButton
                className={ answerSelected && 'correct' }
                test="correct-answer"
                onClick={ this.handleClick }
                name={ questions[0].correct_answer }
              />
            </li>
          </ol>
        </fieldset>
      </div>
    );
  }
}

QuestionsComponent.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuestionsComponent;
