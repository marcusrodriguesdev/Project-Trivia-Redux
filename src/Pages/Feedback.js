import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import playAction from '../Redux/Action';

class Feedback extends React.Component {
  constructor() {
    super();
    this.resetPoints = this.resetPoints.bind(this);
  }

  resetPoints() {
    const { resetScoreAssertion } = this.props;
    resetScoreAssertion({
      score: 0,
      assertions: 0,
    });
  }

  render() {
    const { playerName, playerScore, playerAssertions } = this.props;
    const ASSERTIONS = 3;
    return (
      <div>
        <div>
          <span data-testid="feedback-text">FIM DE JOGO!</span>
        </div>
        <header>
          <img src="" alt="Gravatar" data-testid="header-profile-picture" />
          <span data-testid="header-player-name">{ playerName }</span>
          <span data-testid="header-score">{ playerScore }</span>
        </header>
        <div>
          <p
            data-testid="feedback-text"
          >
            {(playerAssertions >= ASSERTIONS)
              ? 'Mandou bem!'
              : 'Podia ser melhor...'}
          </p>
        </div>
        <div>
          <span data-testid="feedback-total-score">{ playerScore }</span>
          <span data-testid="feedback-total-question">{ playerAssertions }</span>
        </div>

        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.resetPoints }
          >
            Jogar novamente
          </button>
        </Link>

        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.resetPoints }
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  playerAssertions: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  resetScoreAssertion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerAssertions: state.player.assertions,
  playerScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetScoreAssertion: (payload) => dispatch(playAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
