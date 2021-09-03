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
    const { questions } = this.props;
    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrect,
      difficulty,
      question,
    } = questions[0];

    return (
      <main>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
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
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default (Questions);
