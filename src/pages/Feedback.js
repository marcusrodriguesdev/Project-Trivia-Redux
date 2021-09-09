import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    const { player } = this.props;
    const { score, assertions } = player;
    const THREE = 3;
    return (
      <div>
        <Header score={ score } />
        <span data-testid="feedback-text">
          {
            assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'
          }
        </span>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};
