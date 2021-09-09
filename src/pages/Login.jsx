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
    const rankingData = { name, score: 0, picture: email };
    localStorage.setItem('ranking', JSON.stringify(rankingData));
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
      <div className="login-inputs">
        <input
          className="input-email"
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          value={ email }
          placeholder="Insira seu e-mail"
          onChange={ this.handleLogin }
        />
        <input
          className="input-name"
          data-testid="input-player-name"
          type="text"
          name="name"
          value={ name }
          placeholder="Insira seu nome"
          onChange={ this.handleLogin }
        />
        <Link
          to="/game"
        >
          <button
            className="play-button"
            data-testid="btn-play"
            type="button"
            disabled={ !(emailIsValid() && nameIsValid) }
            onClick={ () => this.handleClick() }
          >
            Jogar
          </button>
        </Link>
        <div className="settings-button">
          <ConfigButton />
        </div>
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
