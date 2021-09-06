import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Multiple from '../components/Multiple';
import Boolean from '../components/Boolean';

import arabesco from '../image/arabesco-column.png';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
    };
  }

  render() {
    const { name, avatar, score, rounds } = this.props;
    const { indexQuestion } = this.state;
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
              { rounds[indexQuestion].type === 'multiple'
                ? <Multiple currentQuestion={ rounds[indexQuestion] } />
                : <Boolean currentQuestion={ rounds[indexQuestion] } /> }
            </div>
          </div>
          <div className="game-column"><img src={ arabesco } alt="Arabesco" /></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  { player: { playerInfo: { name, avatar }, score }, game: { rounds } },
) => ({
  name, avatar, score, rounds,
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  rounds: PropTypes.arrayOf({}).isRequired,
};

export default connect(mapStateToProps)(Game);
