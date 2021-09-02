import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      btnDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => this.disableBtn());
  }

  disableBtn() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <form>
        <label htmlFor="input-player-name">
          Nome :
          <input
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="input-gravatar-email">
          Email :
          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>

        <button
          data-testid="btn-play"
          type="button"
          disabled={ btnDisabled }
        >
          Jogar
        </button>
        <Link to="/config">
          <button type="button" data-testid="btn-settings">
            Configuracoes
          </button>
        </Link>
      </form>
    );
  }
}
