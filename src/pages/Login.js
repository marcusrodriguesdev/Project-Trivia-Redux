import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import InputCard from '../components/InputCard';
import fetchToken from '../redux/actions/fetch/fetchToken';
import { actionSaveDataUser } from '../redux/actions';
import clipart128072 from '../clipart128072.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      playerName: '',
      validation: true,
      redirect: false,
    };
    this.onHandlerChange = this.onHandlerChange.bind(this);
    this.onValidation = this.onValidation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { getToken } = this.props;
    getToken();
  }

  onValidation() {
    const min = 3;
    const { email, playerName } = this.state;
    const validation = !(/\w+@\w+.com/.test(email)
     && playerName.length > min
     && (/[A-z\s]+/).test(playerName));
    this.setState({ validation });
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, playerName } = this.state;
    const { saveUser } = this.props;
    saveUser({ email, playerName });
    this.setState({ redirect: true });
    const state = JSON.parse(localStorage.getItem('state')) || {};
    localStorage.setItem(
      'state',
      JSON.stringify({
        player: {
          ...state.player,
          name: playerName,
          gravatarEmail: email,
          score: 0,
          assertions: 0 },
      }),
    );
  }

  onHandlerChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.onValidation());
  }

  render() {
    const { token } = this.props;
    const { email, playerName, validation, redirect } = this.state;
    if (redirect && token) { return <Redirect to="/game" />; }
    return (
      <main>
        <img src={ clipart128072 } alt="Trivia Logo" className="App-logo" />
        <form onSubmit={ this.onSubmit }>
          <InputCard
            labelText="Nome:"
            id="input-player-name"
            name="playerName"
            type="text"
            value={ playerName }
            onChange={ this.onHandlerChange }
            placeholder="User Name"
          />
          <InputCard
            labelText="Email:"
            id="input-gravatar-email"
            name="email"
            type="texto"
            value={ email }
            onChange={ this.onHandlerChange }
            placeholder="email@mail.com"
          />
          <div>
            <button
              data-testid="btn-play"
              type="submit"
              disabled={ validation }
              className="button is-primary is-rounded button-login-pg"
            >
              Jogar
            </button>
            <Link to="/settings">
              <button
                data-testid="btn-settings"
                type="button"
                className="button is-warning is-rounded button-login-pg"
              >
                Settings
              </button>
            </Link>
          </div>
        </form>
      </main>
    );
  }
}

const mapDipatchToProps = (dispatch) => ({
  getToken: (data) => dispatch(fetchToken(data)),
  saveUser: (data) => dispatch(actionSaveDataUser(data)),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, mapDipatchToProps)(Login);

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
