import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import './index.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: {},
      questionNumber: 0,
      loading: true,
      redBorder: '',
      greenBorder: '',
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const { dados: { token } } = this.props;

    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();

    this.setState({
      questions: data.results,
      loading: false,
    });
  }

  handleClick() {
    this.setState({
      greenBorder: 'green-border',
      redBorder: 'red-border',
    });
  }

  renderAnswers() {
    const { questions, questionNumber, redBorder, greenBorder } = this.state; // Testando o git hub

    const answers = [...questions[questionNumber].incorrect_answers,
      questions[questionNumber].correct_answer];
    const index = -1;
    let id = index; // Key do map
    return answers.sort().map((answer) => {
      if (answer === questions[questionNumber].correct_answer) {
        return (
          <button
            type="button"
            data-testid="correct-answer"
            className={ greenBorder }
            onClick={ this.handleClick }
          >
            { answer }
          </button>
        );
      }
      id += 1;
      return (
        <button
          className={ redBorder }
          type="button"
          data-testid={ `wrong-answer-${id}` }
          key={ id }
          onClick={ this.handleClick }
        >
          { answer }
        </button>
      );
    });
  }

  render() {
    const { dados: { name, profile } } = this.props;
    const { loading, questionNumber } = this.state;
    if (loading) return <h1>loading</h1>;
    const { questions } = this.state;

    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">
            { name }
          </h1>
          <img
            src={ `https://www.gravatar.com/avatar/${profile}` }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-score">0</span>
        </header>
        <div>
          <span data-testid="question-category">
            {
              questions[questionNumber].category
            }
          </span>
          <span data-testid="question-text">
            {
              questions[questionNumber].question
            }
          </span>
          <span>
            {
              this.renderAnswers()
            }
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dados: state.loginReducer,
});

export default connect(mapStateToProps, null)(Game);

Game.propTypes = {
  dados: PropTypes.objectOf(PropTypes.string).isRequired,
};
