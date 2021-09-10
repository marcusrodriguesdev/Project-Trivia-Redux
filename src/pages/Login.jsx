import React, { Component } from 'react';
import NameInput from '../components/NameInput';
import EmailInput from '../components/EmailInput';
import logo from '../trivia.png';
import PlayButton from '../components/PlayButton';
import ConfigButton from '../components/ConfigButton';
import RankingButton from '../components/RankingButton';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <NameInput handleChange={ this.handleChange } value={ name } />
          <EmailInput handleChange={ this.handleChange } value={ email } />
          <PlayButton
            buttonCheck={ !(name.length && email.length) }
            playerName={ name }
            playerEmail={ email }
          />
          <ConfigButton />
          <RankingButton />
        </header>
      </div>
    );
  }
}

export default Login;
