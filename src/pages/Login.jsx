import React, { Component } from 'react';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      player: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { handleChange } = this;
    const { player, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form>
          <label htmlFor="palyer">
            <input
              id="player"
              name="player"
              value={ player }
              onChange={ handleChange }
              type="text"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              value={ email }
              onChange={ handleChange }
              type="email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ email.length && player.length ? '' : 'true' }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
