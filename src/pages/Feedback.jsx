import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const tres = 3;

class Feedback extends React.Component {
  render() {
    const { avatar, name } = this.props;
    const storageInfos = localStorage.getItem('player');
    const scorePlayer = JSON.parse(storageInfos);
    return (
      <header>
        <h1 data-testid="feedback-text">Feedbacks</h1>
        <div data-testid="header-profile-picture">{avatar}</div>
        <p data-testid="header-player-name">{name}</p>
        <div data-testid="header-score">{scorePlayer.score}</div>
        {scorePlayer.assertions < tres ? (
          <p data-testid="feedback-text">Podia ser melhor...</p>
        ) : (
          ''
        )}
        {scorePlayer.assertions >= tres ? (
          <p data-testid="feedback-text">Mandou bem!</p>
        ) : (
          ''
        )}
      </header>
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
};

export default connect(mapStateToProps)(Feedback);
