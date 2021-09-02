import React from 'react';

import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      validation: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.inputValidation());
  }

  inputValidation() {
    const { name, email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    if (name.length > 0 && email.length > 0 && regex.test(email)) {
      this.setState({ validation: false });
    } else {
      this.setState({ validation: true });
    }
  }

  render() {
    const { name, email, validation } = this.state;
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
            disabled={ validation }
          >
            PLAY
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
