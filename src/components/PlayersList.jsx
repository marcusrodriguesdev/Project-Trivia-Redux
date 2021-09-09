import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class PlayersList extends Component {
  render() {
    const { ranking } = this.props;
    return (
      <ul>
        { ranking.map(({ name, score, picture }, index) => (
          <li key={ index }>
            <img src={ picture } alt="avatar" />
            <span data-testid={ `player-name-${index}` }>{ name }</span>
            <span data-testid={ `player-score-${index}` }>{ score }</span>
          </li>
        )) }
      </ul>
    );
  }
}

PlayersList.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.any).isRequired,
};
