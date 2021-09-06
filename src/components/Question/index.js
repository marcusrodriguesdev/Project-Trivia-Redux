import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Answer from '../Answer';
import Header from '../Header';
import { increaseScore } from '../../redux/actions/gameActions';

const dificulties = {
  easy: 1,
  medium: 2,
  hard: 3,
};

class Question extends Component {
  constructor(props) {
    super(props);

    this.checkAnswer = this.checkAnswer.bind(this);
  }

  checkAnswer({ text }, dificulty) {
    const { questionInfo, time, increaseGlobalScore } = this.props;
    const { correctAnswer } = questionInfo;
    const baseScore = 10;

    if (text === correctAnswer) {
      const score = baseScore + time * dificulties[dificulty];
      increaseGlobalScore(score);
      const local = JSON.parse(window.localStorage.getItem('state'));
      local.player.score += score;
      window.localStorage.setItem('state', JSON.stringify(local));
    }
  }

  render() {
    const { questionInfo, timeOver } = this.props;
    const { shuffledAnswers } = questionInfo;

    return (
      <>
        <Header />
        <div className="question">
          <p data-testid="question-category">{`Category: ${questionInfo.category}`}</p>
          <p data-testid="question-text">{`Question: ${questionInfo.question}`}</p>
          <div className="answers">
            {shuffledAnswers.map((answer, index) => (
              <Answer
                key={ answer.text }
                timeOver={ timeOver }
                answer={ answer }
                index={ index }
                checkAnswer={ this.checkAnswer }
                questionInfo={ questionInfo }
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

Question.propTypes = {
  increaseGlobalScore: PropTypes.func.isRequired,
  questionInfo: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    shuffledAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
  time: PropTypes.number.isRequired,
  timeOver: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  time: state.game.time,
});

const mapDispatchToProps = (dispatch) => ({
  increaseGlobalScore: (amount) => dispatch(increaseScore(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
