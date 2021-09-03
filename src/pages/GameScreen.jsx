import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { questActionThunk } from '../actions';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.randomAnswer = this.randomAnswer.bind(this);

    this.state = {
      answers: [],
      correctAnswer: '',
    };
  }

  async componentDidMount() {
    const { token, requestQuestions } = this.props;
    await requestQuestions(token);
    this.randomAnswer();
  }

  randomAnswer() {
    const { quest } = this.props;
    const {
      incorrect_answers: incorrectAnswer,
      correct_answer: correctAnswer } = quest.results[0];
    const arrayLength = incorrectAnswer.length + 1;
    const arrayAnswers = Array(arrayLength).fill('');
    const randomNumber = Math.floor(Math.random() * arrayLength);
    let count = 0;

    arrayAnswers.forEach((__, index) => {
      if (index === randomNumber) arrayAnswers[index] = correctAnswer;
      else {
        arrayAnswers[index] = incorrectAnswer[count];
        count += 1;
      }
    });

    this.setState({ answers: arrayAnswers, correctAnswer });
  }

  render() {
    const { quest } = this.props;
    const { answers, correctAnswer } = this.state;
    const loading = <h1>loading</h1>;
    if (!quest.results) return loading;

    return (
      <div>
        <h1 data-testid="question-category">{ quest.results[0].category }</h1>
        <p data-testid="question-text">{ quest.results[0].question }</p>
        { answers && answers.map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              <button
                data-testid="correct-answer"
                key={ answer }
                type="button"
              >
                { answer }
              </button>
            );
          }
          return (
            <button data-testid={ `wrong-answer-${index}` } key={ answer } type="button">
              { answer }
            </button>
          );
        }) }
      </div>
    );
  }
}

GameScreen.propTypes = {
  token: PropTypes.string,
  requestQuestions: PropTypes.objectOf(PropTypes.string),
  quest: PropTypes.objectOf(PropTypes.string),
}.isRequired;

const mapStateToProps = ({ token, quest }) => ({
  token,
  quest,
});

const mapDispatchToProps = (disptach) => ({
  requestQuestions: (token) => (disptach(questActionThunk(token))),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
