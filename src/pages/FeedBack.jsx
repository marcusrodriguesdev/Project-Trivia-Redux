import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends React.Component {
  constructor() {
    super();
    this.addToRanking = this.addToRanking.bind(this);
  }

  componentDidMount() {
    this.addToRanking();
  }

  addToRanking() {
    if (localStorage.ranking) {
      const state = JSON.parse(localStorage.state);
      const ranking = JSON.parse(localStorage.ranking);
      localStorage.ranking = JSON.stringify([...ranking, state.player]);
    } else {
      const state = JSON.parse(localStorage.state);
      localStorage.ranking = JSON.stringify([state.player]);
    }
  }

  render() {
    const { assertions, score } = this.props;
    const FEEDBACK_NUMBER = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        { assertions < FEEDBACK_NUMBER ? 'Podia ser melhor...' : 'Mandou bem!' }
        <p>
          <span data-testid="feedback-total-score">{ score }</span>
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps)(FeedBack);
