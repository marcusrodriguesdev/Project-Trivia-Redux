import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { avatar, name, score } = this.props;
    return (
      <header>
        <div data-testid="header-profile-picture">{avatar}</div>
        <p data-testid="header-player-name">{name}</p>
        <span data-testid="header-score">{score}</span>
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
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
