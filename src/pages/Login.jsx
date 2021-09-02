import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.loginValidator = this.loginValidator.bind(this);
    this.handleClickConfig = this.handleClickConfig.bind(this);
    this.state = {
      name: '',
      email: '',
      buttonValidator: true,
      redirect: false,
    };
  }

  handleChange({ target }) {
    const { value, id } = target;
    this.setState({ [id]: value }, () => this.loginValidator());
  }

  handleClickConfig() {
    this.setState({ redirect: true });
  }

  loginValidator() {
    const { email, name } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const emailVerify = regex.test(email);

    if (emailVerify && name) {
      this.setState({ buttonValidator: false });
    }
  }

  render() {
    const { email, name, buttonValidator, redirect } = this.state;
    if (redirect) return <Redirect to="/config" />;
    return (
      <form method="get">
        <label htmlFor="email">
          Name:
          <input
            id="name"
            data-testid="input-player-name"
            type="text"
            onChange={ this.handleChange }
            value={ name }
          />
        </label>
        <label htmlFor="password">
          Email:
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="email"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ buttonValidator }
          onClick={ this.buttonChange }
          type="button"
        >
          Entrar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClickConfig }
        >
          Configurações
        </button>
      </form>
    );
  }
}

export default Login;
