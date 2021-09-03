import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin, requestTokenThunk } from '../actions';
import ConfigButton from '../components/ConfigButton';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleLogin({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { fetchToken, token } = this.props;
    fetchToken();
    localStorage.setItem('token', token);
  }

  render() {
    const { email, name } = this.state;
    const { userEmail } = this.props;
    const minLength = 1;

    const emailIsValid = () => {
      const validationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // source: https://www.w3resource.com/javascript/form/email-validation.php
      const validEmail = validationRegex.test(email);
      return validEmail;
    };
    const nameIsValid = name.length >= minLength;
    return (
      <div>
        <ConfigButton />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          value={ email }
          placeholder="emaildobol@porexemplo.com"
          onChange={ this.handleLogin }
        />
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          value={ name }
          placeholder="amelhorsenhae12345"
          onChange={ this.handleLogin }
        />
        <Link
          onClick={ () => (userEmail(email)) }
          to="/game"
        >
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !(emailIsValid() && nameIsValid) }
            onClick={ () => this.handleClick() }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => ({
  userEmail: (email) => dispatch(userLogin(email)),
  fetchToken: () => dispatch(requestTokenThunk()),
});

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchtoProps)(Login);
