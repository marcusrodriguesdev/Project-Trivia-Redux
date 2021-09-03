import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userLogin from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    const { userEmail } = this.props;
    const minLength = 1;

    const emailIsValid = () => {
      const validationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // source: https://www.w3resource.com/javascript/form/email-validation.php
      const validEmail = validationRegex.test(email);
      return validEmail;
    };

    const passwordIsValid = password.length >= minLength;

    return (
      <div>

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
          value={ password }
          placeholder="amelhorsenhae12345"
          onChange={ this.handleLogin }
        />
        <Link
          onClick={ () => (userEmail(email)) }
          to="/carteira"
        >

          <button
            data-testid="btn-play"
            type="button"
            disabled={ !(emailIsValid() && passwordIsValid) }
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
});

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchtoProps)(Login);
