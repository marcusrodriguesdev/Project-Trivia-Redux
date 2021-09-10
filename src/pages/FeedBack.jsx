import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.getAssertions = this.getAssertions.bind(this);
  }

  componentDidMount() {
    const { name, score } = this.props;
    const playerObj = { name, score, picture: 'https://www.gravatar.com/avatar/' };
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      ranking = [];
    }
    ranking = [...ranking, playerObj];
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  getAssertions() {
    const THREE = 3;
    const { assertions } = this.props;
    let feedbackMessage = '';
    if (assertions < THREE) {
      feedbackMessage = <p>Podia ser melhor...</p>;
    } else {
      feedbackMessage = <p>Mandou bem!</p>;
    }
    return feedbackMessage;
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <div
          data-testid="feedback-text"
        >
          { this.getAssertions() }
          <p
            data-testid="feedback-total-question"
          >
            { `Você acertou ${assertions} perguntas!` }
          </p>
          <p
            data-testid="feedback-total-score"
          >
            { `Sua pontuação foi de ${score} pontos!` }
          </p>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/Ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(FeedBack);
