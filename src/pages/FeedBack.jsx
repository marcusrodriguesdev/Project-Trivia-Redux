import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const { history, assertions, player: { score, assertions } } = this.props;
    const checkAssertion = () => {
      const NUMBER_THREE = 3;
      if (assertions < NUMBER_THREE) {
        return <div>Podia ser melhor...</div>;
      } if (assertions >= NUMBER_THREE) {
        return <div>Mandou bem!</div>;
      }
    };
    return (
      <div>
        <div>
          <Header />
          <h4 data-testid="feedback-total-score">{ score }</h4>
          <h4 data-testid="feedback-total-question">{ assertions }</h4>
          <button
            onClick={ () => history.push('/') }
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
          <button
            onClick={ () => history.push('/ranking') }
            type="button"
            data-testid="btn-ranking"
          >
            Ver ranking
          </button>
        </div>
        <div data-testid="feedback-text">
          { checkAssertion() }
        </div>
      </div>
    );
  }
}

FeedBack.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  player: state.player,
});

export default connect(mapStateToProps, null)(FeedBack);
