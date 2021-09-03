import React from 'react';
import PropTypes from 'prop-types';
import WrongAnswers from './WrongAnswers';
import CorrectAnswer from './CorrectAnswer';

class Questions extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { question } = this.props;
    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrect,
      difficulty,
      question: questionText,
    } = question;

    return (
      <main>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{questionText}</h2>
        <h3>{difficulty}</h3>
        <CorrectAnswer correct={ correct } />
        { incorrect.map((
          answers, index,
        ) => <WrongAnswers key={ index } answers={ answers } index={ index } />)}
      </main>
    );
  }
}

Questions.propTypes = {
  question: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default (Questions);
