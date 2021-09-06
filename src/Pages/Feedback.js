import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedback extends React.Component {
  handlePlayAgainBtn() {
    const { history } = this.props;

    history.push('/');
  }

  handleRankingBtn() {
    const { history } = this.props;

    history.push('/ranking');
  }

  render() {
    const { assertions, points } = this.props;
    const standardValue = 3;
    const message = assertions < standardValue ? 'Podia ser melhor...' : 'Mandou bem!';
    console.log(assertions);
    return (
      <div data-testid="feedback-text">
        <Header />
        <main>
          <p data-testid="feedback-text">{ message }</p>
          <p data-testid="feedback-total-score">{ points }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handlePlayAgainBtn.bind(this) }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleRankingBtn.bind(this) }
          >
            Ver ranking
          </button>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
};

const mapStateToProps = ({ trivia: { assertions, points } }) => ({
  assertions,
  points,
});

export default connect(mapStateToProps)(Feedback);
