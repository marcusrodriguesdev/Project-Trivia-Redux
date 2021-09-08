import React from 'react';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  // localStorage.setItem('ranking', JSON.stringify(gravatarStorage));
  render() {
    const email = JSON.parse(localStorage.getItem('state')).player.gravatarEmail;
    const gravatar = md5(email).toString();

    return (
      <header className="game-header">
        <img
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt="Foto de Perfil"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">
          {JSON.parse(localStorage.getItem('state')).player.name}
        </h1>
        <h2 data-testid="header-score">
          {' '}
          {JSON.parse(
            localStorage.getItem('state'),
          ).player.score}
        </h2>
      </header>
    );
  }
}

export default Header;
