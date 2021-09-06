import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Question from '../../components/Question';
import Timer from '../../components/Timer';

import { fetchQuestionsThunk } from '../../redux/actions/questionActions';

import {
  nextQuestion as nextQuestionAction,
  setTime,
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
    const DEFAULT_TIME = 30;

    const {
      history,
      nextQuestion,
      currentQuestion,
      questions,
      setTimeRedux,
    } = this.props;

    if (currentQuestion < questions.length - 1) {
      nextQuestion();
      setTimeRedux(DEFAULT_TIME);
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { timeOver } = this.state;

    const { guessed, questions, currentQuestion } = this.props;

    return (
      <div>
        <h1>Game</h1>
        <Timer key={ currentQuestion } setTimeOver={ this.setTimeOver } />
        {questions.length && (
          <Question
            timeOver={ timeOver }
            questionInfo={ questions[currentQuestion] }
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
  currentQuestion: PropTypes.number.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  setTimeRedux: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game, questions }) => ({
  guessed: game.guessed,
  questions: questions.questionsArray,
  currentQuestion: game.currentQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsThunk()),
  nextQuestion: () => dispatch(nextQuestionAction()),
  setTimeRedux: (time) => dispatch(setTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
