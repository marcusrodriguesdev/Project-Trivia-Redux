import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.getFeedback = this.getFeedback.bind(this);
  }

  getFeedback() {
    const NUMBER_ASSERTIONS = 3;
    const state = JSON.parse(localStorage.getItem('state'));
    return state.player.assertions < NUMBER_ASSERTIONS
      ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    const { name, avatar, score } = this.props;
    return (
      <div>
        <Header name={ name } avatar={ avatar } score={ score } />
        <p data-testid="feedback-text">
          { this.getFeedback() }
          <button type="button" onClick={ () => this.getFeedback() }>
            Teste
          </button>
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (
  { player: { playerInfo: { name, avatar }, score } },
) => ({
  name, avatar, score,
});

export default connect(mapStateToProps)(Feedback);
