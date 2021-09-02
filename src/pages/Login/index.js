import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  }

  handleChange({ target }) {
    const { value, name } = target;
    const { validation } = target.dataset;

    this.setState({
      [name]: value,
      [validation]: value.length > 0,
    });
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
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Login;
