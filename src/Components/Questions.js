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
      timer: 30,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(
      () => this.setState((previousTime) => ({ timer: previousTime.timer - 1 }), () => {
        const { timer, answered } = this.state;
        const maximumTime = 0;
        if (timer === maximumTime) {
          clearInterval(this.interval);
          this.setState({ answered: !answered });
        }
      }),
      ONE_SECOND,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    const { answered, timer } = this.state;
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
        <p>
          Tempo:
          { timer }
        </p>
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

// https://www.youtube.com/watch?v=NAx76xx40jM
// https://www.youtube.com/watch?v=sWKz9aLovjY
// https://www.youtube.com/watch?v=RwlFyS1Rhew
