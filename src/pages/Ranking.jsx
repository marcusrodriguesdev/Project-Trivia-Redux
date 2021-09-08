import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  componentDidMount() {
    this.mockRanking();
  }

  handleGravatar(email) {
    const path = md5(email).toString();
    return `https://www.gravatar.com/avatar/${path}`;
  }

  mockRanking() {
    localStorage.clear();
    const ranking = [
      { name: 'leonardo',
        score: 7,
        picture: 'leonardomartins07@gmail.com',
      }, { name: 'lucio',
        score: 6,
        picture: '',
      }, { name: 'guilherme',
        score: 8,
        picture: '',
      }, { name: 'paulynho',
        score: 10,
        picture: '',
      }];
    ranking.sort((player1, player2) => player2.score - player1.score);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <ol>
        {ranking.map((player, index) => (
          <li key={ index }>
            {`Jogador: ${player.name} Pontuação: ${player.score}`}
            <img src={ this.handleGravatar(player.picture) } alt={ player.name } />
          </li>
        ))}
      </ol>
    );
  }
}

export default Ranking;
