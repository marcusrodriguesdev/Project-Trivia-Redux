import React from 'react';

import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const player = JSON.parse(localStorage.getItem('state'));
    console.log(player);
    return (
      <>
        <span data-testid="feedback-text">Feedback</span>
        <Header score={ player.player.score } />
      </>
    );
  }
}

export default Feedback;
