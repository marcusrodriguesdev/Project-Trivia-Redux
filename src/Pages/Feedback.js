import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { clearState as cleaner } from '../Actions';

import '../Styles/feedback.css';

class Feedback extends React.Component {
  handlePlayAgainBtn() {
    const { history, clearState } = this.props;

    clearState();
    history.push('/');
  }

  handleRankingBtn() {
    const { history } = this.props;

    history.push('/ranking');
  }

  render() {
    const { assertions, points } = this.props;
    const standardValue = 3;
    const message = assertions < standardValue ? 'You can do better next time...' : 'You rocked!';

    return (
      <div data-testid="feedback-text">
        <Header />
        <main>
          <p data-testid="feedback-text">{ message }</p>
          <p data-testid="feedback-total-score">{ points }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
          <button
            type="button"
            id="play-again"
            data-testid="btn-play-again"
            onClick={ this.handlePlayAgainBtn.bind(this) }
          >
            Play Again
          </button>
          <button
            type="button"
            id="btn-ranking"
            data-testid="btn-ranking"
            onClick={ this.handleRankingBtn.bind(this) }
          >
            Ranking
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
  clearState: PropTypes.func.isRequired,
};

const mapStateToProps = ({ trivia: { assertions, points } }) => ({
  assertions,
  points,
});

const mapDispatchToProps = (dispatch) => ({
  clearState: () => dispatch(cleaner()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
