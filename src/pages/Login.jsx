import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionLogin from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      user: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndUser = this.validateEmailAndUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.token();
  }

  validateEmailAndUser() {
    const { email, user } = this.state;
    const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    if (emailPattern.test(email) && user.length > 0) {
      return false;
    }
    return true;
  }

  async token() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokien = await response.json();
    const tokienData = tokien.token;
    localStorage.setItem('token', JSON.stringify(tokienData));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(userr, emaill) {
    const { userEmailAction } = this.props;
    userEmailAction(userr, emaill);
  }

  render() {
    const { user, email } = this.state;
    return (
      <div>
        <h1>Loginn</h1>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            id="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="user">
          User:
          <input
            type="text"
            name="user"
            id="user"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Settings
          </button>
        </Link>
        <Link to="/play">
          <button
            disabled={ this.validateEmailAndUser() }
            type="button"
            data-testid="btn-play"
            onClick={ () => this.handleSubmit(user, email) }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  userEmailAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEmailAction: (user, email) => dispatch(actionLogin(user, email)),
});

export default connect(null, mapDispatchToProps)(Login);
