import React from 'react';

class Game extends React.Component {
  render() {
    return (
      <div>
        <header>
          <img src="" alt="profile" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">name</p>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

export default Game;
