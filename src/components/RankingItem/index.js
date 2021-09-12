import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BsTrophy } from 'react-icons/bs';

import './style.css';

const trophyColors = ['gold', 'silver', 'darkorange'];

class RankingItem extends Component {
  render() {
    const { player, index } = this.props;
    const { picture, name, score } = player;
    const podium = index <= 2;

    const style = {
      color: trophyColors[index],
      visibility: podium ? 'visible' : 'hidden',
    };

    return (
      <div className="ranking-item">
        <div className="trophy-icon" style={ style }>
          <BsTrophy />
        </div>

        <h3>{`${index + 1}.`}</h3>
        <img src={ picture } alt={ name } />
        <h3 className="name">{name}</h3>
        <h3 className="score">{score}</h3>
      </div>
    );
  }
}

RankingItem.propTypes = {
  player: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RankingItem;
