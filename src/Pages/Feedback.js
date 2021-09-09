import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  render() {
    const { playerName, playerScore } = this.props;
    // const SCORE = 3;
    return (
      <div>
        <div>
          <span data-testid="feedback-text">FIM DE JOGO!</span>
        </div>
        {/* Requisito 12 */}
        <header>
          <img src="" alt="Gravatar" data-testid="header-profile-picture" />
          <span data-testid="header-player-name">{ playerName }</span>
          <span data-testid="header-score">{ playerScore }</span>
        </header>

        {/* Requisito 13 Mensagem de feedback,
        "Podia ser melhor..." para <3,
        "Mandou bem!" para >- 3 hits */}
        {/* {(playerScore >= SCORE)
          ? (
            <div>
              <span data-testud="feedback-text"> Mandou bem! </span>
            </div>
          )
          : (
            <div>
              <span data-testud="feedback-text"> Podia ser melhor </span>
            </div>
          )} */}

        {/* Requisito 14 */}
        <div>
          <span data-testid="feedback-total-score">Placar Final</span>
          <span data-testid="feedback-total-question">Acertou x perguntas</span>
        </div>

        {/* Requisito 15 */}
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>

        {/* Requisito 16 */}
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
