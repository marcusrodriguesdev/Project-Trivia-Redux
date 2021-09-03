import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: '',
      name: 'teste',
      score: 1,
      message: '',
      correctAnswers: 0,
    };
  }

  FeedbackMensage() {
    const tryAgain = 'Podia ser melhor...';
    const goodJob = 'Mandou bem!';
    const MIN_SCORE = 3;
    // recuperar score
    if (score < MIN_SCORE) {
      this.setState = ({ message: tryAgain });
    } else {
      this.setState = ({ message: goodJob });
    }
  }

  render() {
    const { picture, name, score, message, correctAnswers } = this.state;

    return (
      <div>
        <header>
          <img src={ picture } alt="foto" data-testid="header-profile-picture" />
          <h4 data-testid="header-player-name">{ name }</h4>
          <h6 data-testid="header-score">{ score }</h6>
        </header>
        <h2 data-testid="feedback-text">{ message }</h2>
        <h6 data-testid="feedback-total-score">{score}</h6>
        <h6 data-testid="feedback-total-question">{ correctAnswers }</h6>
      </div>
    );
  }
}

export default Feedback;
