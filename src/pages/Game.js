import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { saveQuestions } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    const { fillQuestions } = this.props;
    fillQuestions(localStorage.getItem('token'));
  }

  function saveQuestions(teste) {
    return async (dispatch) => {
      // trocar quantidade
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${teste}`);
      const obj = await response.json();
      dispatch(getQuestions(obj.results));
    };
  }

  renderQuestions() {
    const { questionsAPi, questionIndex } = this.props;
    const { category,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
      question } = questionsAPi[questionIndex];

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          type="button"
          data-testid="correct-answer"
        >
          { correctAnswer }
        </button>
        {incorrectAnswer.map((answer, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `wrong-answers-${index}` }
          >
            { answer }
          </button>
        ))}
      </div>
    );
  }

  render() {
    const { name, email, isFetching } = this.props;
    const emailHash = md5(email).toString();
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${emailHash}` }
            alt="Avatar"
          />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">0</span>
        </header>
        { !isFetching && this.renderQuestions() }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  isFetching: state.questions.isFetching,
  questionsAPi: state.questions.questionsApi,
  questionIndex: state.questions.questionIndex,
});

const mapDispatchToProps = (dispatch) => ({
  fillQuestions: (teste) => dispatch(saveQuestions(teste)),
});

Game.propTypes = {
  isFetching: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  fillQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
