import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import { resetGame as resetGameAction } from '../../redux/actions/gameActions';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
  }

  getAssertions() {
    const local = window.localStorage.getItem('state');
    const parsedLocal = JSON.parse(local);

    return parsedLocal.player.assertions;
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
    this.setPlayer();
    history.push('/ranking');
  }

  render() {
    const MIN_ASSERTIONS = 3;
    const assertions = this.getAssertions();
    const { score } = this.props;

    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions >= MIN_ASSERTIONS ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
        <p>
          {'Pontuação final: '}
          <span data-testid="feedback-total-score">{score}</span>
        </p>
        <p>
          {'Respostas corretas: '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </p>

        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.handleClick }
        >
          Ver Ranking
        </button>
        <button
          type="button"
          onClick={ this.handlePlayAgain }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game, auth }) => ({
  score: game.score,
  name: auth.name,
  gravatar: auth.gravatar,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGameAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
