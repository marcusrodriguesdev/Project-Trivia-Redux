import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../Reducers/index';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.canBeSubmitted = this.canBeSubmitted.bind(this);
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { fetchAPItoken, token } = this.props;
    fetchAPItoken();
    localStorage.setItem('token', token);
  }

  canBeSubmitted() {
    const { email, name } = this.state;
    const emailValidInput = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(emailValidInput) && name.length > 0) {
      return true;
    }
  }

  handleSettingsButton() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Insira seu nome"
            name="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Insira seu email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !this.canBeSubmitted() }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsButton }
        >
          <Link to="/game">
            <button
              disabled={ btnDisable }
              type="button"
              data-testid="btn-play"
              onClick={ () => this.handleClick() }
            >
              Jogar
            </button>
          </Link>
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  fetchAPItoken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.login.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPItoken: () => dispatch(fetchAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
