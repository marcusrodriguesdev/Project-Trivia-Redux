import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RankingInfo extends Component {
  render() {
    const { index, item: { name, score, picture } } = this.props;
    console.log('index', index);
    return (
      <li>
        <img src={ picture } alt="Gravatar" />
        <p>
          <span data-testid={ `player-name-${index}` }>
            { name }
          </span>
        </p>
        <p>
          <span data-testid={ `player-score-${index}` }>
            { score }
          </span>
          {' points'}
        </p>
      </li>
    );
  }
}

RankingInfo.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default RankingInfo;

// [
//   { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
// ]
