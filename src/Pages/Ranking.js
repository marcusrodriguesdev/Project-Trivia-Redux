import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Components/Button';
import { getRankingDataFromLocalStorage } from '../helpers/localStorage';
import '../Styles/trivia.css';

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
      <div className="ranking-page">
        <h1 data-testid="ranking-title">
          Seu Ranking!
        </h1>
        <div className="players-ranking">
          { ranking.map((player, index) => (
            <div
              className="player-ranking"
              key={ player.name }
            >
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <img src={ player.picture } alt="gravatar" />
              <p data-testid={ `player-score-${index}` }>{`${player.score} pontos`}</p>
            </div>
          )) }
        </div>
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
