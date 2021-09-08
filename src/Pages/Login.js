import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { getToken } from '../Services/fetchAPI';
import logo from '../trivia.png';
// import '../App.css';
import playAction, { getTokenThunk } from '../Redux/Action';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
      playerEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { playerEmail, playerName } = this.state;
    const { updateNameEmail, sendTokenToState } = this.props;
    sendTokenToState();
    updateNameEmail({ playerEmail, playerName });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
    this.validateButton();
  }

  validateButton() {
    const { playerName, playerEmail } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (emailRegex.test(playerEmail) && playerName) {
      return false;
    }
    return true;
  }

  returnButton() {
    return (
      <Link to="/game">
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.onClick }
        >
          Jogar
        </button>
      </Link>
    );
  }

  render() {
    const playButton = this.validateButton();
    const { playerName, playerEmail } = this.state;
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
            placeholder="Name"
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            name="playerEmail"
            value={ playerEmail }
            placeholder="E-mail"
          />
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ playButton }
              onClick={ this.onClick }
            >
              Jogar
            </button>
          </Link>
        </header>

        <Link to="/settings">
          <button type="button" data-testid="btn-settings">Settings</button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  sendTokenToState: PropTypes.func.isRequired,
  updateNameEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateNameEmail: (payload) => dispatch(playAction(payload)),
  sendTokenToState: () => dispatch(getTokenThunk()),
});

export default connect(null, mapDispatchToProps)(Login);
