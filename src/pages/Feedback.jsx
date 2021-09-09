import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getAssertions = this.getAssertions.bind(this);
    this.getScore = this.getScore.bind(this);
    this.setRanking = this.setRanking.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getAssertions() {
    const playerData = JSON.parse(localStorage.getItem('state'));
    return playerData.player.assertions;
  }

  getScore() {
    const playerData = JSON.parse(localStorage.getItem('state'));
    return playerData.player.score;
  }

  setRanking() {
    const { name, picture } = this.props;
    const score = this.getScore();
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const player = { name, score, picture };
    ranking.push(player);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  // getRanking() {
  //   const { player } = JSON.parse(localStorage.state);
  //   const { name, score, gravatarEmail } = player;
  //   const playerInfo = { name, score, picture };
  //   if (localStorage.ranking) {
  //     const ranking = JSON.parse(localStorage.ranking);
  //     const updatedRanking = [...ranking, playerInfo];
  //     localStorage.ranking = JSON.stringify(updatedRanking);
  //   } else {
  //     localStorage.setItem('ranking', JSON.stringify([playerInfo]));
  //   }
  // }

  handleClick() {
    const { history } = this.props;
    this.setRanking();
    history.push('/');
  }

  render() {
    const { picture, name } = this.props;
    const assertions = this.getAssertions();
    const MIN_ASSERTIONS = 3;
    const score = this.getScore();

    return (
      <div>
        <header>
          <img src={ picture } alt="foto" data-testid="header-profile-picture" />
          <h4 data-testid="header-player-name">{ name }</h4>
          <h6 data-testid="header-score">{ score }</h6>
        </header>
        <h2 data-testid="feedback-text">
          { assertions < MIN_ASSERTIONS ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h2>
        <h6 data-testid="feedback-total-score">{ score }</h6>
        <h6 data-testid="feedback-total-question">{ assertions }</h6>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar novamente
          </button>
        </Link>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.handleClick }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  picture: state.gravatar.gravatarURL,
  name: state.loginReducer.name,
});

export default connect(mapStateToProps)(Feedback);
