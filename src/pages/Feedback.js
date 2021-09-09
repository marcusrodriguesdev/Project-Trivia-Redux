import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    const { score } = this.props;
    return (
      <div>
        <Header score={ score } />
        <span data-testid="feedback-text">feedback</span>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};
