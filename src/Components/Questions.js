import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WrongAnswers from './WrongAnswers';
import CorrectAnswer from './CorrectAnswer';
import { setTrivia, showButton } from '../Actions';
import getDifficulty from '../Services/functions';

import '../Styles/trivia.css';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      answered: false,
      timer: 30,
      assertionsAdd: 1,
      showButton: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCorrectBtn = this.handleCorrectBtn.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(
      () => this.setState((previousTime) => ({ timer: previousTime.timer - 1 }), () => {
        const { timer, answered } = this.state;
        const { showNextButton } = this.props;
        const maximumTime = 0;
        if (timer === maximumTime) {
          clearInterval(this.interval);
          this.setState({ answered: !answered });
          showNextButton(this.state);
        }
      }),
      ONE_SECOND,
    );
  }

  componentDidUpdate() {
    const { name, score, email, assertions } = this.props;
    const player = { name, score, gravatarEmail: email, assertions };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick(event) {
    const { answered } = this.state;
    const { showNextButton } = this.props;

    event.preventDefault();
    this.setState({ answered: !answered });
    showNextButton(this.state);
    clearInterval(this.interval);
  }

  handleCorrectBtn() {
    const { answered, timer } = this.state;
    const { savePoints, question: { difficulty } } = this.props;

    this.setState({ answered: !answered });
    const multiplier = (getDifficulty(difficulty));
    const basePoints = 10;

    savePoints({ ...this.state, points: basePoints + (multiplier * timer) });
    clearInterval(this.interval);
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
          handleClick={ this.handleCorrectBtn }
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
  question: PropTypes.shape().isRequired,
  savePoints: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  showNextButton: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user: { email, name }, trivia: { points, assertions } }) => ({
  email,
  name,
  score: points,
  assertions,
});

const mapDispatchToProps = (dispatch) => ({
  savePoints: (state) => dispatch(setTrivia(state)),
  showNextButton: (state) => dispatch(showButton(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

// https://www.youtube.com/watch?v=NAx76xx40jM
// https://www.youtube.com/watch?v=sWKz9aLovjY
// https://www.youtube.com/watch?v=RwlFyS1Rhew
