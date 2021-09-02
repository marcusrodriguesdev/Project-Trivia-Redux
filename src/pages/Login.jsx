import React from 'react';

import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {name, email} = this.state;
    return (
      <div>
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header> */}
        <form className="main-form">
          <label htmlFor="name">
            <input
              data-testid="input-player-name"
              className="input-text-name"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
              placeholder="Digite seu Nome"
            />
          </label>
          <label htmlFor="email">
            <input
              className="input-text-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="Digite seu Email"
            />
          </label>
          <button
            type="button"
            className="play-button"
            data-testid="btn-play"
          >
            PLAY
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
