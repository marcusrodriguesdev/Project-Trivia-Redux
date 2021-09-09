import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Components/Button';
import { getRankingDataFromLocalStorage } from '../helpers/localStorage';

class Ranking extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;

    history.push('/');
  }

  render() {
    const ranking = getRankingDataFromLocalStorage();
    return (
      <div>
        <h1 data-testid="ranking-title">
          Seu Ranking!
        </h1>
        { ranking.map((player, index) => (
          <div
            key={ player.name }
          >
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <img src={ player.picture } alt="gravatar" />
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        )) }
        <footer>
          <Button
            text="Home"
            id="btn-go-home"
            dataTest="btn-go-home"
            onClick={ this.handleClick }
          />
        </footer>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
