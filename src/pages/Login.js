import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveName, saveEmail, saveToken as saveTokenAction } from '../actions/index';
import trivia from '../trivia.png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      btnDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveTokenInLocalStorage = this.saveTokenInLocalStorage.bind(this);
    this.saveNameAndEmail = this.saveNameAndEmail.bind(this);
  }

  async getToken() {
    const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await resolve.json();
    const { token } = data;
    return token;
  }

  async saveTokenInLocalStorage() {
    const token = await this.getToken();
    const { saveToken } = this.props;
    const player = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
    localStorage.setItem('state', JSON.stringify({ player }));
    localStorage.setItem('token', token);
    saveToken(token);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => this.disableBtn());
  }

  disableBtn() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  async saveNameAndEmail() {
    const { saveUserName, saveUserEmail, history } = this.props;
    const { name, email } = this.state;
    await this.saveTokenInLocalStorage();
    saveUserName(name);
    saveUserEmail(email);
    history.push('/trivia');
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <>
        <img className="logo" src={ trivia } alt="trivia-logo" />
        <form className="login-form">
          <label htmlFor="input-player-name">
            Nome:
            <input
              className="input"
              name="name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              className="input"
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <div className="buttons-container">
            <button
              className="button is-primary"
              data-testid="btn-play"
              type="button"
              disabled={ btnDisabled }
              onClick={ this.saveNameAndEmail }
            >
              Jogar
            </button>
            <Link to="/config">
              <button
                className="button is-primary is-light"
                type="button"
                data-testid="btn-settings"
              >
                Configurações
              </button>
            </Link>
          </div>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  saveUserEmail: PropTypes.func,
  saveUserName: PropTypes.func,
  saveToken: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveUserName: (state) => dispatch(saveName(state)),
  saveUserEmail: (state) => dispatch(saveEmail(state)),
  saveToken: (token) => dispatch(saveTokenAction(token)),
});

export default connect(null, mapDispatchToProps)(Login);
