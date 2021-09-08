import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import '../App.css';

class Feedback extends Component {
  constructor() {
    super();
    this.answerHits = this.answerHits.bind(this);
  }

  answerHits() {
    const number = 3;
    const assert = JSON.parse(
      localStorage.getItem('state'),
    ).player.assertions;

    if (assert < number) {
      return <h2 data-testid="feedback-text">Podia ser melhor...</h2>;
    }
    return <h1 data-testid="feedback-text">Mandou bem!</h1>;
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <p data-testid="feedback-total-question">
            {' '}
            {JSON.parse(
              localStorage.getItem('state'),
            ).player.assertions}
          </p>
          {this.answerHits()}
          <p data-testid="feedback-total-score">
            {' '}
            {JSON.parse(
              localStorage.getItem('state'),
            ).player.score}
          </p>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Jogar novamente</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Feedback;
