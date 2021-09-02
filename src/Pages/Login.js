import React, { Component } from 'react';
import logo from '../trivia.png';
import Input from '../Components/Input';
import Button from '../Components/Button';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      emailValid: false,
      nameValid: false,
    };

    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleEmail({ target }) {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
    const emailValid = email.test(target.value);

    this.setState({
      email: target.value,
      emailValid,
    });
  }

  handleName({ target }) {
    const NUMBER_THREE = 3;
    if (target.value.length >= NUMBER_THREE) {
      this.setState({
        nameValid: true,
      });
    }
    this.setState({
      name: target.value,
    });
  }

  render() {
    const { email, name, emailValid, nameValid } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <Input
          name="name"
          dataTest="input-player-name"
          text="Nome: "
          onChange={ this.handleName }
          value={ name }
        />
        <Input
          name="email"
          dataTest="input-gravatar-email"
          text="Email: "
          onChange={ this.handleEmail }
          value={ email }
        />
        <Button
          text="Jogar"
          dataTest="btn-play"
          disabled={ !(emailValid && nameValid) }
        />
      </div>
    );
  }
}

export default Login;
