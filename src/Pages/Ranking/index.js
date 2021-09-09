import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const one = -1;
    ranking.sort((a, b) => {
      if (a.score < b.score) return 1;
      return a.score > b.score ? one : 0;
    });

    const { history } = this.props;
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        {/* <img></img> */}
        {
          ranking.map((player, index) => (
            <div key={ index }>
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>
          ))
        }
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/') }
        >
          voltar
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};
