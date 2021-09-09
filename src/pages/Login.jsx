import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin, requestTokenThunk, requestGravatarThunk } from '../actions';
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
    const { email, name } = this.state;
    const { fetchToken, token, gravatarAvatar, userLog } = this.props;
    localStorage.clear();
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    fetchToken();
    userLog({ email, name });
    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify(player));
    gravatarAvatar(email);
  }

  render() {
    const { email, name } = this.state;
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
  userLog: ({ name, email }) => dispatch(userLogin({ name, email })),
  fetchToken: () => dispatch(requestTokenThunk()),
  gravatarAvatar: (email) => dispatch(requestGravatarThunk(email)),
});

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
});

Login.propTypes = {
  userLog: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  gravatarAvatar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchtoProps)(Login);
