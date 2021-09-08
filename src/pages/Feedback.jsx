import React from 'react';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    console.log('Jogar novamente');
  }

  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const minAssertions = 3;
    return (
      <div>
        <h1 data-testid="feedback-text">
          { assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h1>
        <p>
          O total de respostas certas foi:
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <p>
          Seu score final é:
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.playAgain }
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
