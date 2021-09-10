import React from 'react';
import PropTypes from 'prop-types';
import GravatarHeader from '../components/GravatarHeader';
import FeedbackMensage from '../components/FeedbackMensage';
import PlayerResults from '../components/PlayerResults';

export default class Feedback extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
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
