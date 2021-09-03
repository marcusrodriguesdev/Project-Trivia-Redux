import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import InputCard from '../components/InputCard';
import fetchToken from '../redux/actions/fetch/fetchToken';

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
    const { getToken } = this.props;
    getToken({ email, playerName });
    this.setState({ redirect: true });
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
      <form onSubmit={ this.onSubmit }>
        <InputCard
          labelText="Nome:"
          id="input-player-name"
          name="playerName"
          type="text"
          value={ playerName }
          onChange={ this.onHandlerChange }
        />
        <InputCard
          labelText="Email:"
          id="input-gravatar-email"
          name="email"
          type="texto"
          value={ email }
          onChange={ this.onHandlerChange }
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ validation }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Settings
          </button>
        </Link>
      </form>
    );
  }
}

const mapDipatchToProps = (dispatch) => ({
  getToken: (data) => dispatch(fetchToken(data)),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, mapDipatchToProps)(Login);

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
