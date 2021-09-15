import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { saveName, saveEmail, saveToken as saveTokenAction } from '../actions/index';
import '../Login.css';
import triviaLogo from '../trivia.png';

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
    const { btnDisabled, email } = this.state;
    return (
      <>
        <img className="logo" src={ triviaLogo } alt="Logo Trivia" />
        <form className="login-form">
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="Foto da pessoa"
            className="photo-container"
          />
          <label htmlFor="input-gravatar-email">
            <p>Email</p>
            <input
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="input-player-name">
            <p>Nome</p>
            <input
              name="name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <div className="container-buttons">
            <button
              className="play-btn"
              data-testid="btn-play"
              type="button"
              disabled={ btnDisabled }
              onClick={ this.saveNameAndEmail }
            >
              Jogar
            </button>
            <Link to="/config">
              <button type="button" data-testid="btn-settings">
                Configuracoes
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
