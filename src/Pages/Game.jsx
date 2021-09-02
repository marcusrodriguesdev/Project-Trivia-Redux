import React from 'react';

class Game extends React.Component {
  render() {
    return (
      <header>
        <img
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          alt="Foto de Perfil"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">.</h1>
        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}

export default Game;
