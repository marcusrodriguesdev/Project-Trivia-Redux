import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import Header from './Header';

class Feedback extends Component {
  feedbackMessage(assertions) {
    const MIN_TO_BE_GOOD = 3;
    if (assertions >= MIN_TO_BE_GOOD) {
      return <h3 data-testid="feedback-text">Mandou bem!</h3>;
    }
    return <h3 data-testid="feedback-text">Podia ser melhor...</h3>;
  }

  render() {
    const { assertions, score, history } = this.props;
    return (
      <div className="App">
        {/* <Header /> */}
        { this.feedbackMessage(assertions) }
        <h4>
          {'Placar Final: '}
          <span data-testid="feedback-total-score">{score}</span>
        </h4>
        <h4>
          {'Acertou '}
          <span data-testid="feedback-total-question">{assertions}</span>
          { assertions === 1 ? ' questão' : ' questões'}
        </h4>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape(PropTypes.any).isRequired,
};

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
