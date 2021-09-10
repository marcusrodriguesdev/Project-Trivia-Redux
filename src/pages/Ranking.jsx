import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  // componentDidMount() {
  //   this.mockRanking();
  // }

  handleGravatar(email) {
    const path = md5(email).toString();
    return `https://www.gravatar.com/avatar/${path}`;
  }

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
      <div>
        <header data-testid="ranking-title">Ranking</header>
        <ol>
          {ranking.map((player, index) => (
            <li key={ index }>
              <span data-testid={ `player-name-${index}` }>
                { `${player.name}` }
              </span>
              <span data-testid={ `player-score-${index}` }>
                { `Pontuação: ${player.score} ` }
              </span>
              <img src={ this.handleGravatar(player.picture) } alt={ player.name } />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Ranking;
