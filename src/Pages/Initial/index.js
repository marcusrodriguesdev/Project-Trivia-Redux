import React, { Component } from 'react';
import './style.css';
import Image from './trivia.png';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

import PropTypes from 'prop-types';
import Login from '../../actions';

class Initial extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disable: true,
      profile: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  }

  handleChange({ target }) {
    const { value, id } = target;
    const { name, email } = this.state;
    if (name && email && value) {
      this.setState({
        [id]: value,
        disable: false,
        profile: md5(email).toString(),
      });
    } else {
      this.setState({
        [id]: value,
        disable: true,
        profile: md5(email).toString(),
      });
    }
  }

  async sendLogin() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    const stringToken = token.token;

    localStorage.setItem('token', stringToken);

    const { name, email, profile } = this.state;
    const { Login: LoginAction, history } = this.props;
    LoginAction(name, email, profile, stringToken);

    history.push('/jogo');
  }

  render() {
    const { name, email, disable } = this.state;
    return (
      <div className="mainContent">
        <img
          src={ Image }
          alt="logo"
          className="logoImage"
        />
        <input
          id="name"
          data-testid="input-player-name"
          type="text"
          onChange={ this.handleChange }
          placeholder="Name"
          value={ name }
          className="defaultStyle"
        />

        <input
          id="email"
          data-testid="input-gravatar-email"
          type="text"
          onChange={ this.handleChange }
          placeholder="E-mail"
          value={ email }
          className="defaultStyle"
        />

        <button
          data-testid="btn-play"
          type="button"
          disabled={ disable }
          onClick={ this.sendLogin }
          className="defaultStyle btnLogin"
        >
          Jogar
        </button>
        <Link
          to="/configuracoes"
          data-testid="btn-settings"
          className="defaultStyle configBtn"
        >
          Configurações
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Login: (name, email, profile, token) => dispatch(Login(name, email, profile, token)),
});

export default connect(null, mapDispatchToProps)(Initial);

Initial.propTypes = {
  Login: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};
