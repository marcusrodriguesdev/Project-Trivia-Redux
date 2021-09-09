import React from 'react';
import PropTypes from 'prop-types';
import Gravatar from '../components/gravatar';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.showRanking = this.showRanking.bind(this);
  }

  showRanking(name, score) {
    this.setState((prevState) => ({ ranking: [...prevState.ranking, { name, score }] }));
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    // Logica retirada na referência https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
    const userRanking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => {
        if (a.score - b.score === 0) {
          const fa = a.picture.toLowerCase();
          const fb = b.picture.toLowerCase();
          const returnNegative = -1;
          if (fa < fb) {
            return returnNegative;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        }
        return b.score - a.score;
      });

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { userRanking.map((user, index) => (
            <li key={ user }>
              <Gravatar email={ user.email } />
              <span data-testid={ `player-name-${index}` }>{user.name}</span>
              <span data-testid={ `player-score-${index}` }>{user.score}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-go-home"
        >
          Inicio
        </button>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};
