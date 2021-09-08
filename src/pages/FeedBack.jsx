import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const { history, assertions } = this.props;
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
        FeedBack
        <div>
          <Header />
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
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(FeedBack);
