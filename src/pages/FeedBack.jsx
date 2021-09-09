import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header, { CONVERT_HASH, GRAVATAR } from '../components/Header';

class FeedBack extends React.Component {
  componentDidMount() {
    const { player: { name, score, email } } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    if (Object.prototype.hasOwnProperty.call(localStorage, 'ranking')) {
      localStorage
        .setItem('ranking', JSON
          .stringify([...ranking, {
            name, score, picture: `${GRAVATAR}${CONVERT_HASH(email)}`,
          }]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([{
        name, score, picture: `${GRAVATAR}${CONVERT_HASH(email)}`,
      }]));
    }
  }

  render() {
    const { history, player: { score, assertions } } = this.props;
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
  player: state.player,
});

export default connect(mapStateToProps, null)(FeedBack);