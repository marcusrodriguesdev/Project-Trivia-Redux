import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions as getQuestionsAction } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyGet: false,
    };
    this.renderQuestion = this.renderQuestion.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.renderCorrectAnswersButton = this.renderCorrectAnswersButton.bind(this);
    this.renderIncorrectAnswerButton = this.renderIncorrectAnswerButton.bind(this);
  }

  // Função que embaralha arrays
  shuffleArray(array) { // Função provinda de "https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array"
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  renderCorrectAnswersButton(questions, questionIndex) {
    return (
      <button
        type="button"
        data-testid="correct-answer"
      >
        {questions[questionIndex].correct_answer}
      </button>
    );
  }

  renderIncorrectAnswerButton(questions, questionIndex, index) {
    return (
      <button
        key={ index }
        type="button"
        data-testid={ `wrong-answer-${index}` }
      >
        {questions[questionIndex].incorrect_answers[index]}
      </button>
    );
  }

  renderQuestion() {
    const { getQuestions, token, questions } = this.props;
    const { alreadyGet } = this.state;
    if (token !== undefined && alreadyGet === false) {
      getQuestions(token);
      this.setState({ alreadyGet: true });
    }
    if (questions !== undefined) {
      const questionIndex = 0;
      const arrayOfAnswers = [{ id: 0,
        correct: true,
        answer: questions[questionIndex].correct_answer }];
      questions[questionIndex].incorrect_answers.forEach((element, index) => (
        arrayOfAnswers.push({ id: index,
          correct: false,
          answer: questions[questionIndex].incorrect_answers[index] })
      ));
      const shuffledArray = this.shuffleArray(arrayOfAnswers);
      return (
        <div>
          <h4 data-testid="question-category">{questions[questionIndex].category}</h4>
          <p data-testid="question-text">{questions[questionIndex].question}</p>
          {shuffledArray.map((element) => (
            element.correct
              ? this.renderCorrectAnswersButton(questions, questionIndex)
              : this.renderIncorrectAnswerButton(questions, questionIndex, element.id)
          ))}
        </div>
      );
    }
    return (
      <h4>Preparando Quiz</h4>
    );
  }

  render() {
    const { name } = this.props;
    console.log(name);
    return (
      <div>
        <header>
        <img
          src="https://www.gravatar.com/avatar/"
          data-testid="header-profile-picture"
          alt="gravatar"
        />
        <h3 data-testid="header-player-name">
          { name }
        </h3>
        <p data-testid="header-score">0</p>
      </header>
        {this.renderQuestion()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  token: state.user.token.token,
  questions: state.game.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(getQuestionsAction(token)),
});

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.shape({
      category: PropTypes.string,
      type: PropTypes.string,
      difficulty: PropTypes.string,
      question: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
