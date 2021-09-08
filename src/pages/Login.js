import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.submitClick = this.submitClick.bind(this);
  }

  validateEmail(event) {
    const userEmail = event.target.value;
    const caractersPassword = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (caractersPassword.test((userEmail))) {
      return this.setState({
        email: userEmail,
      });
    }
    return this.setState({
      email: '',
    });
  }

  validateName(event) {
    const userName = event.target.value;
    if (userName.length >= 1) {
      return this.setState({
        name: userName,
      });
    }
    return this.setState({
      name: '',
    });
  }

  requestToken() {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((res) => res.json())
      .then((data) => localStorage.setItem('token', data.token));
  }

  submitClick() {
    const { setUserValue, history } = this.props;
    setUserValue(this.state);
    this.requestToken();
    history.push('/configuration');
  }

  render() {
    const { email, name } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              id="name"
              type="text"
              onChange={ this.validateName }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              onChange={ this.validateEmail }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !name || !email }
            onClick={ this.submitClick }
          >
            Jogar
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.submitClick }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserValue: (payload) => dispatch(setUser(payload)),
});

Login.propTypes = {
  setUserValue: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
