import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    const { email, nome } = this.state;
    const VALIDATE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const VALID_EMAIL = VALIDATE_EMAIL.test(email);
    const MIN_CHAR = 3;
    if (nome.length > MIN_CHAR && VALID_EMAIL) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { nome, email, disabled } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            <label htmlFor="nome">
              <input
                id="nome"
                type="text"
                name="nome"
                value={ nome }
                data-testid="input-player-name"
                placeholder="Nome"
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="email">
              <input
                id="email"
                type="text"
                name="email"
                value={ email }
                placeholder="exemplo@exemplo.com"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="button"
              data-testid="btn-play"
              disabled={ disabled }
            >
              Jogar
            </button>

            <button type="button" data-testid="btn-settings">
              <Link to="/settings"> Configurações </Link>
            </button>
          </p>
        </header>
      </div>

    );
  }
}

export default Login;
