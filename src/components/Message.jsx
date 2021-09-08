import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Message extends Component {
  render() {
    const { hits } = this.props;
    const TRES = 3;
    if (hits >= TRES) {
      return <div data-testid="feedback-text">Mandou bem!</div>;
    } if (hits < TRES) {
      return <div data-testid="feedback-text">Podia ser melhor...</div>;
    }
  }
}

Message.propTypes = {
  hits: PropTypes.number.isRequired,
};
