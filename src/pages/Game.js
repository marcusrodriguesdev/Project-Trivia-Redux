import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../App.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      questions: [],
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.saveQuestions();
  }

  handleClick() {
    const rightBtn = document.querySelector('.correct-btn');
    const wrongBtn = document.querySelectorAll('.wrong-btn');
    rightBtn.className = 'correct-answer';
    wrongBtn.forEach((button) => {
      button.className = 'wrong-answer';
    });
  }

  async saveQuestions() {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const obj = await response.json();
    this.setState({
      questions: [...obj.results],
    });
  }

  renderQuestions() {
    const { questions, questionIndex } = this.state;
    const { category,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
      question } = questions[questionIndex];

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          type="button"
          data-testid="correct-answer"
          className="correct-btn"
          onClick={ this.handleClick }
        >
          { correctAnswer }
        </button>
        {incorrectAnswer.map((answer, index) => (
          <button
            onClick={ this.handleClick }
            className="wrong-btn"
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
    const { name, email } = this.props;
    const { questions } = this.state;
    const isFetching = questions.length === 0;
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
  token: state.token.token,
});

Game.propTypes = {
  isFetching: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
