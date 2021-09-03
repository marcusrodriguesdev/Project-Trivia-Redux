import React from 'react';

class Game extends React.Component {
  render() {
    return (
      <div>
        <header>
          <img src="" alt="" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">Nome</p>
          <p data-testid="header-score">0</p>
        </header>

      </div>
    );
  }
}

export default Game;
