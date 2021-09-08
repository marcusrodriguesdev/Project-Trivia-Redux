import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RankingInfo from '../components/RankingInfo';

class Ranking extends Component {
  render() {
    const rankings = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <ul>
          { rankings
            .sort((a, b) => b.score - a.score)
            .map(
              (item, index) => (
                <RankingInfo item={ item } index={ index } key={ index } />),
            ) }
        </ul>
        <Link data-testid="btn-go-home" to="/">
          <button type="button">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;

// [
//   { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
// ]
