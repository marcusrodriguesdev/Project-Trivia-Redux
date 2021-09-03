import React from 'react';
import PropTypes from 'prop-types';

class QuestionsComponent extends React.Component {
  render() {
    const { questions } = this.props;
    console.log('tela question', questions[0]);
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
            <li>
              <button type="button" data-testid="wrong-answer">
                { questions[0].incorrect_answers }
              </button>
            </li>
            <li>
              <button type="button" data-testid="correct-awswer">
                { questions[0].correct_answer }
              </button>
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
