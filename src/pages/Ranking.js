import PropTypes from 'prop-types';
import React from 'react';
// import PropTypes from 'prop-types';

export default class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const { history } = this.props;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ul>
          {getRanking
            && getRanking.sort((lower, greater) => greater.score - lower.score)
              .map((user, index) => (
                <li key={ index }>
                  <span data-testid={ `player-name-${index}` }>{user.name}</span>
                  <span data-testid={ `player-score-${index}` }>{user.score}</span>
                </li>
              ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
