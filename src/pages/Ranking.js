import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.pushGame = this.pushGame.bind(this);
  }

  pushGame() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <ul>
          {
            ranking.map((rank, index) => (
              <li data-testid="player-bdn" key={ index }>
                <img src={ rank.picture } alt="cabeça de um ser humano" />
                <p>
                  <span data-testid={ `player-name-${index}` }>{ rank.name }</span>
                  {' - '}
                  <span data-testid={ `player-score-${index}` }>{ rank.score }</span>
                </p>
              </li>
            ))
          }
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.pushGame }
        >
          Jogar novamente
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

export default Ranking;
