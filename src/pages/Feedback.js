import React from 'react';

import Header from '../components/Header';

class Feedback extends React.Component {
//   constructor(props) {
//     super(props);

  //     // this.getFeedback = this.getFeedback.bind(this);
  //   }

  render() {
    const player = JSON.parse(localStorage.getItem('state'));
    const MIN_ASSERTIONS = 3;

    const getFeedback = () => (player.player.assertions < MIN_ASSERTIONS
      ? 'Podia ser melhor...'
      : 'Mandou bem!');
    return (
      <>
        <Header score={ player.player.score } />
        <span data-testid="feedback-text">{ getFeedback() }</span>
      </>
    );
  }
}

export default Feedback;
