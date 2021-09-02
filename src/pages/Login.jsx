import React, { Component } from 'react';
import NameInput from '../components/NameInput';
import EmailInput from '../components/EmailInput';
import logo from '../trivia.png';
import PlayButton from '../components/PlayButton';

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
          <PlayButton
            buttonCheck={ !(nameInput.length && emailInput.length) }
          />
        </header>
      </div>
    );
  }
}

export default Login;
