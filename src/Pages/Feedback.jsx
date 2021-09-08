import React, { Component } from 'react';
import Header from '../Components/Header';
import '../App.css';

class Feedback extends Component {
  constructor() {
    super();
    this.answerHits = this.answerHits.bind(this);
  }

  answerHits() {
    const number = 3;
    const varialvelQualquer = 4;
    if (varialvelQualquer < number) {
      return <h2 data-testid="feedback-text">Podia ser melhor...</h2>;
    }
    return <h1 data-testid="feedback-text">Mandou bem!</h1>;
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          {this.answerHits()}
          <p datar-testid="feedback-total-score">Pontuacao</p>
          <p datar-testid="feedback-total-question">Qtn de responstas certas</p>
        </div>
      </div>
    );
  }
}

export default Feedback;
