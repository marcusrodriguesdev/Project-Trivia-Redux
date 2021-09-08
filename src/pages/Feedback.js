import React from 'react';
import { Link } from 'react-router-dom';

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

        <span data-testid="feedback-total-score">
          { player.player.score }
        </span>
        <span data-testid="feedback-total-question">
          { player.player.assertions }
        </span>

        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </>
    );
  }
}

export default Feedback;
