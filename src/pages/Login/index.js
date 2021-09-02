import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchToken } from '../../redux/actions';

import './style.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      validName: false,
      validEmail: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    const { validation } = target.dataset;

    this.setState({
      [name]: value,
      [validation]: value.length > 0,
    });
  }

  handleClick(event) {
    const { fetch, token, history } = this.props;
    const { name, email } = this.state;
    event.preventDefault();
    fetch();
    const playerDataString = JSON.stringify({
      player: {
        name,
        assertions: '',
        score: '',
        gravatarEmail: email,
      },
    });
    window.localStorage.setItem('state', playerDataString);
    window.localStorage.setItem('token', token);
    history.push('/game');
  }

  render() {
    const { name, email, validName, validEmail } = this.state;
    const { history } = this.props;

    return (
      <div>
        <form className="login-form">
          <input
            data-testid="input-player-name"
            data-validation="validName"
            placeholder="Nome"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />

          <input
            data-testid="input-gravatar-email"
            data-validation="validEmail"
            placeholder="Email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />

          <button
            data-testid="btn-play"
            type="submit"
            disabled={ !validName || !validEmail }
            onClick={ this.handleClick }
          >
            Jogar
          </button>

          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  fetch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
