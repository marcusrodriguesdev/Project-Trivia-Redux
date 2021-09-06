import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

class Feedback extends Component {
  getAssertions() {
    const local = window.localStorage.getItem('state');
    const parsedLocal = JSON.parse(local);

    return parsedLocal.player.assertions;
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
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  score: game.score,
});

export default connect(mapStateToProps)(Feedback);
