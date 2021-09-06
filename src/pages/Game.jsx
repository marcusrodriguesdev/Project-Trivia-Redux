import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

import arabesco from '../image/arabesco-column.png';

class Game extends Component {
  render() {
    const { name, avatar, score } = this.props;
    return (
      <div className="page-body">
        <div className="game-body">
          <div className="game-column"><img src={ arabesco } alt="Arabesco" /></div>
          <div className="game-column-center">
            <Header
              name={ name }
              avatar={ avatar }
              score={ score }
            />
            <div className="game-main">
              Game
            </div>
          </div>
          <div className="game-column"><img src={ arabesco } alt="Arabesco" /></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  { player: { player: { name, avatar }, score } },
) => ({
  name, avatar, score,
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
