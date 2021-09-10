import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import ConfigButton from '../components/ConfigButton';
import { getRanking } from '../helpers/localStorage';

export default class Ranking extends Component {
  render() {
    const ranking = getRanking();
    const baseUrl = 'https://www.gravatar.com/avatar/';
    return (
      <div data-testid="ranking-title">
        <h1>Ranking:</h1>
        { ranking.map((player, index) => (
          <div key={ player.name }>
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <img
              src={ `${baseUrl}${md5(player.picture).toString()}` }
              alt="user-avatar"
            />
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}
        <Link to="/">
          <ConfigButton
            test="btn-go-home"
            name="Inicio"
          />
        </Link>
      </div>
    );
  }
}
