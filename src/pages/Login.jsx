import React, { Component } from 'react';
import logo from '../trivia.png';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form>
          <label htmlFor="name">
            <input id="name" type="text" data-testid="input-player-name" />
          </label>
          <label htmlFor="email">
            <input id="email" type="email" data-testid="input-gravatar-email" />
          </label>
          <button type="button" data-testid="btn-play">
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
