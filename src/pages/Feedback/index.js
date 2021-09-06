import React, { Component } from 'react';
import { connect } from 'react-redux';

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

    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions >= MIN_ASSERTIONS ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  score: game.score,
});

export default connect(mapStateToProps)(Feedback);
