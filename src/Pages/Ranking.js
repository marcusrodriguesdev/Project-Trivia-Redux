import React from 'react';
import { Link } from 'react-router-dom';
import trophy from '../assets/trophy.png';
import './ranking.css';

class Ranking extends React.Component {
  render() {
    return (
      <div className="ranking-wrapper">
        <div className="rank-container">
          <h3 className="rank-title">Ranking</h3>
          <div className="rank-item">
            <div className="rank-box-index">
              <p className="rank-index">1</p>
            </div>
            <img className="rank-image" src="https://memegenerator.net/img/instances/85220527/no-consegue-n-.jpg" alt="" />
            <p className="rank-player-name">Marcus Vinicius Mendes</p>
            <img className="trophy" src={ trophy } alt="trophy" />
            <p className="rank-player-score">400 pontos</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Ranking;
