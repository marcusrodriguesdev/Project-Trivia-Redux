import React, { Component } from 'react';
import RankingButton from '../components/RankingButton';

class Feedback extends Component {
  render() {
    return (
      <div>
        <p data-testid="feedback-text">Aqui está seu fedback moço</p>
        <RankingButton />
      </div>
    );
  }
}

export default Feedback;
