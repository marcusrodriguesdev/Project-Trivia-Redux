import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const tres = 3;

class Feedback extends React.Component {
  render() {
    const { avatar, name, history } = this.props;
    const storageInfos = localStorage.getItem('state');
    const scorePlayer = JSON.parse(storageInfos);
    return (
      <div>
        <header>
          <h1 data-testid="feedback-text">Feedbacks</h1>
          <div data-testid="header-profile-picture">{avatar}</div>
          <p data-testid="header-player-name">{name}</p>
          <div data-testid="header-score">{scorePlayer.player.score}</div>
          {scorePlayer.player.assertions < tres ? (
            <p data-testid="feedback-text">Podia ser melhor...</p>
          ) : (
            ''
          )}
          {scorePlayer.player.assertions >= tres ? (
            <p data-testid="feedback-text">Mandou bem!</p>
          ) : (
            ''
          )}
        </header>
        <section>
          <h4>Pontuação Final:</h4>
          <span data-testid="feedback-total-score">
            {scorePlayer.player.score}
          </span>
          <h4>Número de questões corretas:</h4>
          <span data-testid="feedback-total-question">
            {scorePlayer.player.assertions}
          </span>
          <br />
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ver Ranking
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Feedback.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps)(Feedback);
