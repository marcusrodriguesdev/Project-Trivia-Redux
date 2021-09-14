import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { playerInfo as playerInfoAction } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.redirectSetting = this.redirectSetting.bind(this);
  }

  async getToken() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const object = await response.json();
    localStorage.setItem('token', object.token);
  }

  async handleClick() {
    const { history, playerInfo } = this.props;
    const { email, name } = this.state;
    await this.getToken();

    playerInfo({ email, name });
    localStorage.setItem(
      'state',
      JSON.stringify({
        player: {
          name: '',
          score: 0,
          assertions: 0,
          gravatarEmail: '',
        },
      }),
    );
    history.push('/jogo');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  redirectSetting() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { handleChange, handleClick } = this;
    const { name, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form className="form">
          <label className="label-name" htmlFor="name">
            Nome:
            <input
              id="name"
              name="name"
              value={ name }
              onChange={ handleChange }
              type="text"
              data-testid="input-player-name"
            />
          </label>
          <label className="label-email" htmlFor="email">
            E-mail:
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
            disabled={ email.length && name.length ? '' : 'true' }
            onClick={ handleClick }
          >
            Jogar
          </button>
          <button
            type="submit"
            data-testid="btn-settings"
            onClick={ this.redirectSetting }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf().isRequired,
  playerInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playerInfo: (payload) => dispatch(playerInfoAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
