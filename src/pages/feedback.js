import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setRanking as setRankingAction } from '../actions';
import HeaderFeedback from '../components/HeaderFeedback';

class feedback extends Component {
  constructor() {
    super();

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name, score, gravatarImagem) {
    const { setRanking } = this.props;
    setRanking({ name, score, gravatarImagem });
  }

  feedbackMessage(assertions) {
    const MIN_TO_BE_GOOD = 3;
    if (assertions >= MIN_TO_BE_GOOD) {
      return <h3 data-testid="feedback-text">Mandou bem!</h3>;
    }
    return <h3 data-testid="feedback-text">Podia ser melhor...</h3>;
  }

  sendLocalStorage(click) {
    console.log(click);
  }

  render() {
    const { assertions, score, name, gravatarImagem } = this.props;
    return (
      <div className="App">
        <HeaderFeedback />
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
          type="submit"
          data-testid="btn-play-again"
          onClick={ () => (this.handleClick(name, score, gravatarImagem)) }
        >
          <Link to="/">
            Jogar novamente
          </Link>
        </button>
        <button
          type="submit"
          data-testid="btn-ranking"
          onClick={ () => (this.handleClick(name, score, gravatarImagem)) }
        >
          <Link to="/ranking">
            Ver Ranking
          </Link>
        </button>
      </div>
    );
  }
}

feedback.propTypes = {
  localStorageRanking: PropTypes.func.isRequired,
  setRanking: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape(PropTypes.any).isRequired,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  gravatarImagem: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
  name: player.name,
  gravatarImagem: player.gravatarImagem,
});

const mapDispatchToProps = (dispatch) => ({
  setRanking: (player) => dispatch(setRankingAction(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(feedback);
