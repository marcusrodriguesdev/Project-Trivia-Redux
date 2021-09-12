import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { GrFormClose, GrFormCheckmark } from 'react-icons/gr';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { resetGame as resetGameAction } from '../../redux/actions/gameActions';

import './style.css';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
  }

  componentDidMount() {
    this.setPlayer();
  }

  setPlayer() {
    const { name, score, gravatar } = this.props;
    const ranking = window.localStorage.getItem('ranking');
    const emptyArray = '[]';
    const playersJSON = ranking || emptyArray;
    const players = JSON.parse(playersJSON);
    const newPlayer = { name, score, picture: gravatar };
    players.push(newPlayer);
    window.localStorage.setItem('ranking', JSON.stringify(players));
  }

  handlePlayAgain() {
    const { history, resetGame } = this.props;
    resetGame();
    history.push('/');
  }

  handleClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const MIN_ASSERTIONS = 3;
    const { score, assertions } = this.props;

    return (
      <>
        <Header />
        <div className="feedback-section">
          {assertions >= MIN_ASSERTIONS ? (
            <div className="message-section">
              <GrFormCheckmark className="success" />
              <p className="feedback-message">Good Job!</p>
            </div>
          ) : (
            <div className="message-section">
              <GrFormClose className="failure" />
              <p className="feedback-message">You could have done better...</p>
            </div>
          )}
          <div className="results">
            <p>
              {'Points: '}
              <span data-testid="feedback-total-score">{score}</span>
            </p>
            <p>
              {'Correct answers: '}
              <span data-testid="feedback-total-question">{assertions}</span>
            </p>
          </div>
          <div className="buttons-section">
            <Button type="button" onClick={ this.handleClick } text="Ranking" />

            <Button
              type="button"
              onClick={ this.handlePlayAgain }
              text="Play again"
            />
          </div>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  gravatar: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  resetGame: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game, auth }) => ({
  score: game.score,
  name: auth.name,
  gravatar: auth.gravatar,
  assertions: game.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGameAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
