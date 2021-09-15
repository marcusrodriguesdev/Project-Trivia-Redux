import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header, { CONVERT_HASH, GRAVATAR } from '../components/Header';
import '../css/Feedback.css';

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

  checkAssertion() {
    const { player: { assertions } } = this.props;

    const NUMBER_THREE = 3;
    if (assertions < NUMBER_THREE) {
      return 'Podia ser melhor...';
    } if (assertions >= NUMBER_THREE) {
      return 'Mandou bem!';
    }
  }

  render() {
    const { history, player: { score, assertions } } = this.props;
    const message = this.checkAssertion()
    return (
      <div
        className={
          `feedback ${message === 'Mandou bem!' ? 'green' : 'red'}`
        }
      >
        <div className="feedback-main">
          <p data-testid="feedback-text" className="feedback-text">
            { message }
          </p>

          <p data-testid="feedback-total-score" className="feedback-score">
            Score:
            <br />
            { score }
          </p>

          <p data-testid="feedback-total-question" className="feedback-questions">
            Respostas Corretas:
            <br />
            { assertions }
          </p>

          <div className="feedback-button play-again">
            <button
              onClick={ () => history.push('/') }
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </div>

          <div className="feedback-button go-to-ranking">
            <button
              onClick={ () => history.push('/ranking') }
              type="button"
              data-testid="btn-ranking"
            >
              Ver ranking
            </button>
          </div>
        </div>
        <Header />
      </div>
    );
  }
}

FeedBack.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, null)(FeedBack);
