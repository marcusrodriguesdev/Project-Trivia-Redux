import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Feedback</p>
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  score: game.score,
});

export default connect(mapStateToProps)(Feedback);
