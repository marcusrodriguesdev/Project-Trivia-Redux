import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      user: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndUser = this.validateEmailAndUser.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateEmailAndUser() {
    const { email, user } = this.state;
    if (email.length > 0 && user.length > 0) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <h1>Loginn</h1>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            id="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="user">
          User:
          <input
            type="text"
            name="user"
            id="user"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <button
          disabled={ this.validateEmailAndUser() }
          type="button"
          data-testid="btn-play"
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
