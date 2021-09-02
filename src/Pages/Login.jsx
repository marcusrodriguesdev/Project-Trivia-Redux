import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { username, email } = this.state;
    return (
      <div>
        <fieldset>
          <label htmlFor="name-input">
            Nome:
            <input
              type="text"
              id="name-input"
              data-testid="input-player-name"
              name="username"
              onChange={ this.handleChanges }
              value={ username }
            />
          </label>
          <label htmlFor="email-input">
            Email:
            <input
              type="email"
              id="email-input"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChanges }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(email && username) }
          >
            Jogar
          </button>
        </fieldset>
      </div>
    );
  }
}

export default Login;
