import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Ranking.css';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: [],
    };

    this.getGameRank = this.getGameRank.bind(this);
  }

  getGameRank() {
    const rankingStorage = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = rankingStorage.sort((a, b) => b.score - a.score);

    this.setState({ ranking: sortRanking });
  }

  render() {
    const { ranking } = this.state;

    return (
      <section className="ranking-info">
        <h2 data-testid="ranking-title">Ranking</h2>
        {ranking.map((player, index) => (
          <div key={ index }>
            <img src={ player.picture } alt="Player avatar" />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Jogar Novamente
          </button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
