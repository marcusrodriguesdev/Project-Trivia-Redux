import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.playAgain = this.playAgain.bind(this);
    this.goRanking = this.goRanking.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  goRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const minAssertions = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          { assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h1>
        <p>
          {'O total de respostas certas foi: '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <p>
          {'Seu score final é: '}
          <span data-testid="feedback-total-score">{ score }</span>
        </p>

        <Button
          data-testid="btn-play-again"
          onClick={ this.playAgain }
          label="Jogar Novamente"
        />

        <Button
          data-testid="btn-ranking"
          onClick={ this.goRanking }
          label="Ver Ranking"
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Feedback;
