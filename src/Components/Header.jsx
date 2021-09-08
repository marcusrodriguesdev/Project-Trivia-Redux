import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="game-header">
        <img
          src={ `https://www.gravatar.com/avatar/${JSON.parse(localStorage.getItem('ranking')).picture}` }
          alt="Foto de Perfil"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">
          {JSON.parse(localStorage.getItem('player')).name}
        </h1>
        <h2>
          Score:
          <span data-testid="header-score"></span>
        </h2>
      </header>
    );
  }
}

export default Header;
