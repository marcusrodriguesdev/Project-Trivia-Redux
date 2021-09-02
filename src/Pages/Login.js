import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.canBeSubmitted = this.canBeSubmitted.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  canBeSubmitted() {
    const { email, name } = this.state;
    const emailValidInput = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(emailValidInput) && name.length > 0) {
      return true;
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Insira seu nome"
            name="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Insira seu email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !this.canBeSubmitted() }
        >
          Jogar
        </button>
      </div>
    );
  }
}
