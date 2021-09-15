import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BtnPlayAgain from '../components/BtnPlayAgain';
import { loadRanking } from '../services/getLocal';
import './Ranking.css';

export default class Ranking extends Component {
  render() {
    const rankingList = loadRanking();
    const { history } = this.props;
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
        {rankingList.map((player, index) => (
          <div key={ player.id } className="ranking-list">
            <img src={ player.image } alt="User logo" className="alt-name" />
            <div data-testid={ `player-name-${index}` }>{player.name}</div>
            <span
              data-testid={ `player-score-${index}` }
              className="ranking-score"
            >
              {player.score}
            </span>
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
