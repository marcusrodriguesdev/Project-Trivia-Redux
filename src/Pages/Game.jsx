import React from 'react';

class Game extends React.Component {
  render() {
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${JSON.parse(localStorage.getItem('ranking')).picture}` }
          alt="Foto de Perfil"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">
          {JSON.parse(localStorage.getItem('player')).name}
        </h1>
        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}

export default Game;
