import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import '../App.css';

class Feedback extends Component {
  constructor() {
    super();
    this.answerHits = this.answerHits.bind(this);
  }

  componentDidMount() {
    this.saveRanking();
  }

  saveRanking() {
    const state = JSON.parse(localStorage.getItem('state')).player;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const gravatar = md5(state.gravatarEmail).toString();
    const newRanking = ranking
      ? [...ranking, { name: state.name, score: state.score, picture: gravatar }]
      : [{ name: state.name, score: state.score, picture: gravatar }];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
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
      <div className="feedback-div">
        <Header />
        <div className="message-feedback-div">
          <h2>
            Alternativas Corretas:
            <span data-testid="feedback-total-question">
              {JSON.parse(
                localStorage.getItem('state'),
              ).player.assertions}
            </span>
          </h2>
          {this.answerHits()}
          <h2>
            Pontuação:
            <span data-testid="feedback-total-score">
              {JSON.parse(
                localStorage.getItem('state'),
              ).player.score}
            </span>
          </h2>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Jogar novamente</button>
          </Link>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">Ver Ranking</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Feedback;
