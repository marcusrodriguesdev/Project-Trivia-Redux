import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      player: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async getToken() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const object = await response.json();
    localStorage.setItem('token', object.token);
  }

  handleClick() {
    const { history } = this.props;
    this.getToken();
    history.push('/jogo');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { handleChange, handleClick } = this;
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
            onClick={ handleClick }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default Login;
