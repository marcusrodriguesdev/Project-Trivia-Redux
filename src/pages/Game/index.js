import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Question from '../../components/Question';
import Timer from '../../components/Timer';

import {
  fetchQuestionsThunk,
  nextQuestion as nextQuestionAction,
} from '../../redux/actions/gameActions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeOver: false,
    };

    this.setTimeOver = this.setTimeOver.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;

    fetchQuestions();
  }

  setTimeOver() {
    this.setState({
      timeOver: true,
    });
  }

  handleNextQuestion() {
    const { history, nextQuestion, questionIndex, questions } = this.props;

    if (questionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { timeOver } = this.state;

    const { guessed, questions, questionIndex } = this.props;

    return (
      <div>
        <h1>Game</h1>
        <Timer key={ questionIndex } setTimeOver={ this.setTimeOver } />
        {questions.length && (
          <Question
            timeOver={ timeOver }
            questionInfo={ questions[questionIndex] }
          />
        )}
        {guessed && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleNextQuestion }
          >
            Próxima
          </button>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  guessed: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game }) => ({
  guessed: game.guessed,
  questions: game.questions,
  questionIndex: game.questionIndex,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsThunk()),
  nextQuestion: () => dispatch(nextQuestionAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
