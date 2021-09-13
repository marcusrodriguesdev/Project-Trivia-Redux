import React from 'react';
import { Link } from 'react-router-dom';
import { MD5 } from 'crypto-js';

export default class GameRanking extends React.Component {
  componentDidMount() {
    localStorage.removeItem('state');
  }

  render() {
    const ranking = JSON.parse(localStorage.ranking).sort((a, b) => b.score - a.score);
    console.log(ranking);
    return (
      <>
        <h1 data-testid="ranking-title">
          ranking
        </h1>
        <div>
          {ranking.map((player, index) => {
            const token = MD5(player.gravatarEmail).toString();
            const URL = `https://www.gravatar.com/avatar/${token}`;
            return (
              <div key={ index }>
                <img src={ URL } alt="" />
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <strong
                  data-testid={ `player-score-${index}` }
                >
                  {` score: ${player.score}`}
                </strong>
              </div>
            );
          })}
        </div>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Inicio</button>
        </Link>
      </>
    );
  }
}
