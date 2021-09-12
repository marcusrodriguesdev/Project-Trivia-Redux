import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RankingItem from '../../components/RankingItem';
import Button from '../../components/Button';

import { resetGame as resetGameAction } from '../../redux/actions/gameActions';

import './style.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
    };

    this.setPlayers = this.setPlayers.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.sortPlayers = this.sortPlayers.bind(this);
  }

  componentDidMount() {
    this.setPlayers();
  }

  setPlayers() {
    const localPlayersString = window.localStorage.getItem('ranking');
    const localPlayers = JSON.parse(localPlayersString);
    const sortedPlayers = this.sortPlayers(localPlayers);
    this.setState({ players: sortedPlayers });
  }

  sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score);
  }

  handleHomeClick() {
    const { history, resetGame } = this.props;
    resetGame();
    history.push('/');
  }

  render() {
    const { players } = this.state;
    return (
      <div className="ranking-section">
        <h2 data-testid="ranking-title">RANKING</h2>

        <div className="ranking">
          {players.map((player, index) => (
            <RankingItem key={ index } player={ player } index={ index } />
          ))}
        </div>

        <Button
          className="ranking-button"
          type="button"
          onClick={ this.handleHomeClick }
          text="Home"
        />
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGameAction()),
});

export default connect(null, mapDispatchToProps)(Ranking);
