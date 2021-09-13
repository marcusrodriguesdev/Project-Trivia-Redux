import React, { Component } from 'react';
import HomeButton from '../components/HomeButton';

class Ranking extends Component {
  // componentDidMount() {
  //   this.mockRanking();
  // }

  // mockRanking() {
  //   const maxPoints = 100;
  //   const maxAssertions = 5;
  //   localStorage.clear();
  //   const ranking = [
  //     { name: 'leonardo',
  //       score: Math.floor(Math.random() * maxPoints),
  //       assertion: Math.floor(Math.random() * maxAssertions),
  //       picture: 'leonardomartins07@gmail.com',
  //     }, { name: 'lucio',
  //       score: Math.floor(Math.random() * maxPoints),
  //       assertion: Math.floor(Math.random() * maxAssertions),
  //       picture: '',
  //     }, { name: 'guilherme',
  //       score: Math.floor(Math.random() * maxPoints),
  //       assertion: Math.floor(Math.random() * maxAssertions),
  //       picture: '',
  //     }, { name: 'paulynho',
  //       score: Math.floor(Math.random() * maxPoints),
  //       assertion: Math.floor(Math.random() * maxAssertions),
  //       picture: '',
  //     }];
  //   ranking.sort((player1, player2) => player2.score - player1.score);
  //   localStorage.setItem('ranking', JSON.stringify(ranking));
  // }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="main-container">
        <header data-testid="ranking-title" className="ranking-header">
          <p className="ranking-title">Ranking</p>
        </header>
        <div className="ranking-list">
          <ul>
            {ranking.map((player, index) => (
              <li key={ index } className="ranking-player">
                <div className="player-position">
                  <p className="podium-number">{ `${index + 1}°` }</p>
                  <div data-testid={ `player-name-${index}` }>
                    { `${player.name}` }
                  </div>
                </div>
                <div data-testid={ `player-score-${index}` } className="player-score">
                  { `${player.score} Pontos` }
                </div>
              </li>
            ))}
          </ul>
        </div>
        <HomeButton />
      </div>
    );
  }
}

export default Ranking;
