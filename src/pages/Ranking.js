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
    // const { ranking } = this.state;
    this.setState((prevState) => ({ ranking: [...prevState.ranking, { name, score }] }));
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const userRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { userRanking.map((user) => (
            <li key={ user }>
              <Gravatar email={ user.email } />
              <span>{user.name}</span>
              <span>{user.score}</span>
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
