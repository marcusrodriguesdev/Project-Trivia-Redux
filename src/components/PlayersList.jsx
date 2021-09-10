import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../css/Ranking.css';

export default class PlayersList extends Component {
  render() {
    const { ranking } = this.props;

    ranking.sort((a, b) => b.score - a.score);

    return (
      <ul>
        { ranking.map(({ name, score, picture }, index) => (
          <li className="list" key={ index }>
            <img className="invisible" src={ picture } alt="avatar" />
            <div className="listContainer">
              <span
                className="player-name"
                data-testid={ `player-name-${index}` }
              >
                <span className="number">{ index + 1 }</span>
                { name }
              </span>
              <span
                className="player-score"
                data-testid={ `player-score-${index}` }
              >
                { score }
              </span>
            </div>
          </li>
        )) }
      </ul>
    );
  }
}

PlayersList.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.any).isRequired,
};
