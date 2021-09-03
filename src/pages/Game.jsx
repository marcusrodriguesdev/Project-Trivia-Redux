import React, { Component } from 'react';

export default class Game extends Component {
  render() {
    return (
      <div>
        <header>
          <img src="" alt="user" data-testid="header-profile-picture" />
          {/* <p data-testid="header-player-name">{name}</p> */}
          <p data-testid="header-score">Placar: 0</p>
        </header>
      </div>
    );
  }
}
