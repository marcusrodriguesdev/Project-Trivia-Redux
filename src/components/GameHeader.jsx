import React from 'react';
import PropTypes from 'prop-types';
import headerIcon from '../header-icon.svg';

class GameHeader extends React.Component {
  render() {
    const { counter } = this.props;
    return (
      <div className="game-header-on">
        <div className="game-header-content">
          <span>{`rodada ${counter + 1}/5`}</span>
          <img src={ headerIcon } alt="jogada atual" className="game-header-icon" />
        </div>
      </div>
    );
  }
}

export default GameHeader;

GameHeader.propTypes = {
  counter: PropTypes.number,
}.isRequired;
