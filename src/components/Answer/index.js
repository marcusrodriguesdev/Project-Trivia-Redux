import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';

import { guess as guessAction } from '../../redux/actions/gameActions';

import './style.css';

class Answer extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { guess, checkAnswer, questionInfo, answer } = this.props;
    const { difficulty } = questionInfo;

    guess();
    checkAnswer(answer, difficulty);
  }

  render() {
    const {
      answer,
      guessed,
      timeOver,
    } = this.props;

    let className = 'answer-button';

    if (guessed || timeOver) {
      className = answer.isCorrect ? 'answer-button correct' : 'answer-button incorrect';
    }

    return (
      <Button
        type="button"
        className={ className }
        onClick={ this.handleClick }
        disabled={ timeOver || guessed }
        text={ answer.text }
      />
    );
  }
}

Answer.propTypes = {
  answer: PropTypes.shape({
    isCorrect: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  checkAnswer: PropTypes.func.isRequired,
  guess: PropTypes.func.isRequired,
  guessed: PropTypes.bool.isRequired,
  questionInfo: PropTypes.shape({
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  timeOver: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ game }) => ({
  guessed: game.guessed,
});

const mapDispatchToProps = (dispatch) => ({
  guess: () => dispatch(guessAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
