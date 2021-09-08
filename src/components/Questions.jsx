import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/api';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      loading: true,
      answered: false,
    };

    this.getQuestionsFromAPI = this.getQuestionsFromAPI.bind(this);
    this.getSortedButtons = this.getSortedButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestionsFromAPI();
  }

  async getQuestionsFromAPI() {
    this.setState({ loading: true });
    const token = localStorage.getItem('token');

    const questions = await getQuestions(token);
    this.setState({ questions, loading: false });
  }

  getSortedButtons() {
    const { questions, currentQuestionIndex, answered } = this.state;
    const { over } = this.props;
    const currentQuestion = questions[currentQuestionIndex];

    const buttons = [
      <button
        key={ currentQuestion.correct_answer }
        type="button"
        disabled={ answered || over }
        data-testid="correct-answer"
        style={ answered ? { border: '3px solid rgb(6, 240, 15)' } : {} }
        onClick={ this.handleClick }
        name="correct"
      >
        {currentQuestion.correct_answer}
      </button>,
      currentQuestion.incorrect_answers.map((answer, i) => (
        <button
          key={ answer }
          type="button"
          disabled={ answered || over }
          data-testid={ `wrong-answer-${i}` }
          style={ answered ? { border: '3px solid rgb(255, 0, 0)' } : {} }
          onClick={ this.handleClick }
          name="incorrect"
        >
          {answer}
        </button>
      )),
    ];

    const fator = 0.5;
    const sortedButtons = buttons.sort(() => Math.random() - fator);
    return sortedButtons;
  }

  nextQuestion() {
    this.setState((prevstate) => ({
      currentQuestionIndex: prevstate.currentQuestionIndex + 1, answered: false,
    }));
  }

  handleClick(event) {
    const { questions, currentQuestionIndex } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const { difficulty } = currentQuestion;
    const defaultPoint = 10;
    const { time, score, assertions } = this.props;
    const difficultyPoints = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    if (event.target.name === 'correct') {
      const state = JSON.parse(localStorage.getItem('state'));
      const newState = {
        ...state,
        player: {
          score: score
            + defaultPoint + (time * difficultyPoints[difficulty]),
          assertions: assertions + 1,
        },
      };
      localStorage.setItem('state', JSON.stringify(newState));
    }
    this.setState({ answered: true });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <span>Loading...</span>;
    }

    const { questions, currentQuestionIndex, answered } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div>
        <section>
          <h2 data-testid="question-category">{currentQuestion.category}</h2>
          <p data-testid="question-text">{currentQuestion.question}</p>
        </section>
        <section className="answered">
          {this.getSortedButtons()}
          <br />
        </section>
        { answered
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Próxima
          </button>
        )}
      </div>
    );
  }
}

Questions.propTypes = {
  over: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  over: state.user.over,
  email: state.user.email,
  time: state.user.time,
  score: state.user.score,
  assertions: state.user.assertions,
});

export default connect(mapStateToProps)(Questions);
