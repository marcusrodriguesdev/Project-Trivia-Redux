import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GravatarHeader from '../components/GravatarHeader';
import FeedbackMensage from '../components/FeedbackMensage';
import PlayerResults from '../components/PlayerResults';
import RankingButton from '../components/RankingButton';

export default class Feedback extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <RankingButton />
        <GravatarHeader />
        <FeedbackMensage />
        <PlayerResults />
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.object,
}.isRequired;
