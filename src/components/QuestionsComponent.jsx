import React from 'react';
import PropTypes from 'prop-types';
// import ConfigButton from './ConfigButton';

import './Questions.css';
import ConfigButton from './ConfigButton';

class QuestionsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      answerSelected: false,
      count: 30,
      questionIndex: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    const ONE_SECOND = 1000;

    setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }, ONE_SECOND);
  }

  handleClick() {
    this.setState({
      answerSelected: true,
    });
  }

  render() {
    const { questions } = this.props;
    const { count, questionIndex, answerSelected } = this.state;
    return (
      <div>
        <h3>
          { count > 0 ? (`TEMPO RESTANTE: ${count} segundos`) : 'TEMPO ESGOTADO!' }
        </h3>
        <fieldset>
          <h1 data-testid="question-category">
            { questions[questionIndex].category }
          </h1>
          <h2 data-testid="question-text">
            { questions[questionIndex].question }
          </h2>
          <ol>
            <li classNme="incorrect">
              {(questions[questionIndex].incorrect_answers).map((incorrect, index) => (
                <ConfigButton
                  key={ index }
                  className={ answerSelected && 'incorrect' }
                  test={ `wrong-answer-${index}` }
                  name={ incorrect }
                  onClick={ this.handleClick }
                  disable={ count <= 1 }
                />
              ))}
            </li>
            <li>
              <ConfigButton
                className={ answerSelected && 'correct' }
                test="correct-answer"
                onClick={ this.handleClick }
                name={ questions[questionIndex].correct_answer }
                disable={ count <= 1 }
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
