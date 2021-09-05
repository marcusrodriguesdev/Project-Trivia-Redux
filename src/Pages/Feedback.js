import React from 'react';
import PropTypes from 'prop-types';
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
    return (
      <div data-testid="feedback-text">
        <Header />
        <main>
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
};

export default Feedback;
