import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [{
        name: '',
        score: '',
      }],
    };
    this.handleClick = this.handleClick.bind(this);
    this.showRanking = this.showRanking.bind(this);
  }

  componentDidMount() {
    const getUserRanking = JSON.parse(localStorage.getItem('state'));
    const { player: { score, name } } = getUserRanking;
    this.showRanking(name, score);
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
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { ranking.length === 0 ? undefined : ranking.map((user) => (
            <li key={ user }>
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
