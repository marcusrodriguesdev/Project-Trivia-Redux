import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Question from '../../components/Question';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

import { fetchQuestionsThunk } from '../../redux/actions/questionActions';
import { resetGame as resetGameAction } from '../../redux/actions/gameActions';

class Game extends Component {
  componentDidMount() {
    const { fetchQuestions, email, history, resetGame } = this.props;

    if (!email) {
      resetGame();
      history.push('/');
    } else {
      fetchQuestions();
    }
  }

  render() {
    const { questions, isFetching, currentQuestion } = this.props;

    if (isFetching) {
      return (
        <div>
          <Header />
          <Loading />
        </div>
      );
    }

    return (
      <div>
        <Header />
        {questions.length && (
          <Question questionInfo={ questions[currentQuestion] } { ...this.props } />
        )}
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ game, questions, auth }) => ({
  questions: questions.questionsArray,
  currentQuestion: game.currentQuestion,
  isFetching: questions.isFetching,
  email: auth.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsThunk()),
  resetGame: () => dispatch(resetGameAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
