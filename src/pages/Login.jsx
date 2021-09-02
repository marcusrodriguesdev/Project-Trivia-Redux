import React, { Component } from 'react';
import NameInput from '../components/NameInput';
import EmailInput from '../components/EmailInput';
import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      emailInput: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { nameInput, emailInput } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <NameInput handleChange={ this.handleChange } value={ nameInput } />
          <EmailInput handleChange={ this.handleChange } value={ emailInput } />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !(nameInput.length && emailInput.length) }
          >
            Login
          </button>
        </header>
      </div>
    );
  }
}

export default Login;
