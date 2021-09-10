import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BtnPlayAgain from '../components/BtnPlayAgain';
import { loadRanking } from '../services/getLocal';

export default class Ranking extends Component {
  render() {
    const rankingList = loadRanking();
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankingList.map((player, index) => (
          <div key={ player.id } data-testid={ `player-name-${index}` }>
            <img src={ player.image } alt="User logo" />
            {player.name}
            <span data-testid={ `player-score-${index}` }>{player.score}</span>
          </div>
        ))}
        <BtnPlayAgain history={ history } testid="btn-go-home" />
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
