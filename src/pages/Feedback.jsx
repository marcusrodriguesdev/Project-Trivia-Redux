import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedbackMensage from '../components/FeedbackMensage';
import PlayerResults from '../components/PlayerResults';
import RankingButton from '../components/RankingButton';

export default class Feedback extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <div className="feedback-container">
          <FeedbackMensage />
          <PlayerResults />
          <RankingButton />
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
            className="system-btn play-again-btn"
          >
            Jogar novamente
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.object,
}.isRequired;
