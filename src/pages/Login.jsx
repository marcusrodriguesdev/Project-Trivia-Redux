import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { setGameToken as setGameTokenAction } from '../redux/actions';

import getTokenTrivia from '../services/triviaAPI';

const NEGATIVE_ONE = -1;
const NUMBER_THREE = 3;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      nameValid: false,
      email: '',
      emailValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.validateUserEmail = this.validateUserEmail.bind(this);
    this.validateDomainEmail = this.validateDomainEmail.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  async onSubmitForm() {
    const { setGameToken } = this.props;
    const token = await getTokenTrivia();
    setGameToken(token.token);
    this.saveTokenSession(token.token);
    console.log(token.token);
  }

  validateUserEmail(user) {
    return (
      (user.length >= 1)
      && (user.search('@') === NEGATIVE_ONE)
      && (user.search(' ') === NEGATIVE_ONE)
    );
  }

  validateDomainEmail(domain) {
    return (
      (domain.length >= NUMBER_THREE)
      && (domain.search('@') === NEGATIVE_ONE)
      && (domain.search(' ') === NEGATIVE_ONE)
      && (domain.search('.') !== NEGATIVE_ONE)
      && (domain.indexOf('.') >= 1)
      && (domain.lastIndexOf('.') < domain.length - 1)
    );
  }

  validateInput(name, value) {
    if (name === 'name') {
      if (value.length !== 0) {
        this.setState({ nameValid: true });
      }
    } else if (name === 'email') {
      const user = value.substring(0, value.indexOf('@'));
      const domain = value.substring(value.indexOf('@') + 1, value.length);
      if (this.validateUserEmail(user) && this.validateDomainEmail(domain)) {
        this.setState({
          emailValid: true,
        });
      } else {
        this.setState({
          emailValid: false,
        });
      }
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.validateInput(name, value);
  }

  saveTokenSession(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { name, email, nameValid, emailValid } = this.state;
    const isButtonEnabled = emailValid && nameValid;
    return (
      <div>
        Tela de Login
        <label htmlFor="login-email-input">
          Email do Gravatar:
          <input
            type="email"
            id="login-email-input"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="login-name-input">
          Nome do Jogador:
          <input
            type="text"
            id="login-name-input"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.onSubmitForm }
          disabled={ !isButtonEnabled }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  setGameToken: PropTypes.func.isRequired,
  // token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ game: { token } }) => ({
  token,
});

const mapDispatchToProps = (dispatch) => ({
  setGameToken: (token) => dispatch(setGameTokenAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
