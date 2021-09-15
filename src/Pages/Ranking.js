import React from 'react';
import { Link } from 'react-router-dom';
import trophy from '../assets/trophy.png';
import './ranking.css';

class Ranking extends React.Component {
  render() {
    const rank = JSON.parse(localStorage.getItem('ranking'));
    rank.sort((a, b) => b.score - a.score);
    return (
      <div className="ranking-wrapper">
        <div className="rank-container">
          <div className="handle-title">
            <h3 className="rank-title" data-testid="ranking-title">Ranking</h3>
            <span />
          </div>
          {rank.map((player, index) => (
            <div className="rank-item" key={ index }>
              <div className="rank-box-index">
                <p className="rank-index">{ index + 1}</p>
              </div>
              <img className="rank-image" src={ player.picture } alt="Gravatar" />
              <p
                className="rank-player-name"
                data-testid={ `player-name${index}` }
              >
                { player.name }
              </p>
              <img className="trophy" src={ trophy } alt="trophy" />
              <p
                className="rank-player-score"
                data-testid={ `player-score${index}` }
              >
                { player.score }
                {' '}
                pontos
              </p>
            </div>
          ))}
        </div>
        <Link to="/">
          <button className="ranking-home-button" type="button" data-testid="btn-go-home">
            Home
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
