import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchToken as FetchTokenAction } from '../Redux/Actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
  }

  componentDidMount() {
    const { fetchToken } = this.props;
    fetchToken();
  }

  handleChanges({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  saveLocalStorage() {
    const { username, email } = this.state;
    const storage = { player: {
      name: username,
      gravatarEmail: email,
      score: 0,
      assertions: 0,
    } };
    localStorage.setItem('state', JSON.stringify(storage));
  }

  render() {
    const { username, email } = this.state;
    return (
      <div className="login-div">
        <fieldset>
          <label htmlFor="name-input">
            Nome:
            <input
              type="text"
              id="name-input"
              data-testid="input-player-name"
              name="username"
              onChange={ this.handleChanges }
              value={ username }
            />
          </label>
          <label htmlFor="email-input">
            Email:
            <input
              type="email"
              id="email-input"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChanges }
            />
          </label>
          <Link to="/Game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !(email && username) }
              onClick={ this.saveLocalStorage }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(FetchTokenAction()),
});

export default connect(null, mapDispatchToProps)(Login);
