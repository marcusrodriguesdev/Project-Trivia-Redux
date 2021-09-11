import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setUser as setUserAction, getTokenApi as getTokenApiAction } from '../Actions';
import '../Styles/login.css';

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
    this.handlePlayButton = this.handlePlayButton.bind(this);
  }

  componentDidMount() {
    const { getToken } = this.props;

    getToken();
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  handlePlayButton() {
    const { token, history, setUser } = this.props;

    setUser(this.state);

    localStorage.setItem('token', token);
    history.push('/trivia');
  }

  handleSettingsButton() {
    const { history } = this.props;

    history.push('/settings');
  }

  canBeSubmitted() {
    const { email, name } = this.state;
    const emailValidInput = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(emailValidInput) && name.length > 0) {
      return true;
    }
  }

  render() {
    return (
      <div id="div">
        <h1 id="trivia-txt">TRIVIA</h1>
        <label htmlFor="input-player-name">
          Name
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Enter your name"
            name="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email
          <input
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Enter your email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          id="play-button"
          data-testid="btn-play"
          disabled={ !this.canBeSubmitted() }
          onClick={ this.handlePlayButton }
        >
          Play
        </button>
        <button
          id="setting-button"
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsButton }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ trivia: { token } }) => ({
  token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: (token) => dispatch(getTokenApiAction(token)),
  setUser: (user) => dispatch(setUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
