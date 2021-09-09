import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Questions.css';
import ConfigButton from './ConfigButton';
import { setScore as setScoreAction } from '../redux/actions';

let COUNTER;

class QuestionsComponent extends React.Component {
  constructor(props) {
    super(props);

    const { name, email } = this.props;

    this.state = {
      answerSelected: false,
      count: 30,
      questionIndex: 0,
      score: 0,
      assertions: 0,
      name,
      gravatarEmail: email,
    };

    this.timer = this.timer.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    const { score, assertions, name, gravatarEmail } = this.state;
    const { setScore } = this.props;

    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    };

    localStorage.setItem('state', JSON.stringify(state));
    setScore(score);
  }

  // timer() {
  //   const ONE_SECOND = 1000;

  //   setInterval(() => {
  //     this.setState((prevState) => ({
  //       count: prevState.count - 1,
  //     }));
  //   }, ONE_SECOND);
  // }

  timer() {
    const ONE_SECOND = 1000;

    COUNTER = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }, ONE_SECOND);
  }

  updateScore({ target }) {
    const { name } = target;
    const { count, questionIndex } = this.state;
    const { questions } = this.props;
    const correctAnswer = questions[questionIndex].correct_answer;
    const questionDifficulty = questions[questionIndex].difficulty;
    const BASE_POINTS = 10;

    const difficulties = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    const difficultyPoints = difficulties[questionDifficulty];

    if (correctAnswer === name) {
      this.setState((prevState) => ({
        score: prevState.score + (BASE_POINTS + (count * difficultyPoints)),
        assertions: prevState.assertions + 1,
      }));
    }

    this.setState({
      answerSelected: true,
    });

    // Retirado da documentação https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
    clearInterval(COUNTER);
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
                  onClick={ this.updateScore }
                  disable={ count <= 1 || answerSelected }
                />
              ))}
            </li>
            <li>
              <ConfigButton
                className={ answerSelected && 'correct' }
                test="correct-answer"
                onClick={ this.updateScore }
                name={ questions[questionIndex].correct_answer }
                disable={ count <= 1 || answerSelected }
              />
            </li>
          </ol>
        </fieldset>
      </div>
    );
  }
}

QuestionsComponent.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user: { name, email } }) => ({
  name,
  email,
});

const mapDispatchToProps = (dispatch) => ({
  setScore: (payload) => dispatch(setScoreAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsComponent);
