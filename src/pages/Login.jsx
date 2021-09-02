import React, { Component } from 'react';
import logo from '../trivia.png';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.infoCheck = this.infoCheck.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), this.infoCheck);
  }

  infoCheck() {
    const { name, email } = this.state;
    const isDisable = !(name.length > 0 && email.length > 0);
    this.setState({ isDisable });
  }

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            LOGIN
          </p>
          <form>
            <label htmlFor="name">
              Nome:
              <input
                data-testid="input-player-name"
                type="text"
                id="name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                data-testid="input-gravatar-email"
                type="text"
                id="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="btn-play"
              type="button"
              onClick={ this.handleClick }
              disabled={ isDisable }
            >
              Jogar
            </button>
          </form>
        </header>
      </div>
    );
  }
}
