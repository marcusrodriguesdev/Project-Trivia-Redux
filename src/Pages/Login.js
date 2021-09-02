import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
      playerEmail: '',
      playButton: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
  }

  validateButton() {
    const { playerName, playerEmail } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (emailRegex.test(playerEmail) && playerName) {
      console.log(this.state);
      this.setState({
        playButton: true,
      });
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
    this.validateButton();
  }

  render() {
    const { playerName, playerEmail, playButton } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            name="playerName"
            value={ playerName }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            name="playerEmail"
            value={ playerEmail }
          />
          {playButton ? <button type="button" data-testid="btn-play">Jogar</button>
            : <button type="button" data-testid="btn-play" disabled>Jogar</button>}
        </header>

        <Link to="/settings">
          <button type="button" data-testid="btn-settings"></button>
        </Link>
      </div>
    );
  }
}

export default Login;
