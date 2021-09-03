import React from 'react';
import PropTypes from 'prop-types';
import WrongAnswers from './WrongAnswers';
import CorrectAnswer from './CorrectAnswer';

import '../Styles/trivia.css';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      answered: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick(event) {
    const { answered } = this.state;

    event.preventDefault();
    this.setState({ answered: !answered });
  }

  render() {
    const { answered } = this.state;
    const { question } = this.props;
    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrect,
      difficulty,
      question: questionText,
    } = question;
    const btnCorrectClass = answered ? 'correct-btn' : 'null';
    const btnIncorrectClass = answered ? 'wrong-btn' : 'null';
    const btnDisabled = !!answered;

    return (
      <main>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{questionText}</h2>
        <h3>{difficulty}</h3>
        <CorrectAnswer
          correct={ correct }
          handleClick={ this.handleClick }
          btnClass={ btnCorrectClass }
          disabled={ btnDisabled }
        />
        {
          incorrect.map((
            answers, index,
          ) => (<WrongAnswers
            key={ index }
            answers={ answers }
            index={ index }
            handleClick={ this.handleClick }
            btnClass={ btnIncorrectClass }
            disabled={ btnDisabled }
          />))
        }
      </main>
    );
  }
}

Questions.propTypes = {
  question: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default (Questions);
