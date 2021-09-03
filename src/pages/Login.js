import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveName, saveEmail, saveToken as saveTokenAction } from '../actions/index';

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
    const { saveUserName, saveUserEmail } = this.props;
    const { name, email } = this.state;
    await this.saveTokenInLocalStorage();
    saveUserName(name);
    saveUserEmail(email);
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <form>
        <label htmlFor="input-player-name">
          Nome :
          <input
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="input-gravatar-email">
          Email :
          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>

        <Link to="/trivia">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ btnDisabled }
            onClick={ this.saveNameAndEmail }
          >
            Jogar
          </button>
        </Link>
        <Link to="/config">
          <button type="button" data-testid="btn-settings">
            Configuracoes
          </button>
        </Link>
      </form>
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
