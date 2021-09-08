import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionLogin, { actionPlayerScore } from '../actions';

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
    const { player } = this.props;
    this.token();
    const playerScore = {
      player: {
        // name: '',
        assertions: 0,
        score: 0,
        // gravatarEmail: '',
      },
    };
    // localStorage.setItem('state', JSON.stringify(playerScore));
    player(0, playerScore.player.score);
  }

  validateEmailAndUser() {
    const { email, user } = this.state;
    const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    const player = {
      user,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
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
          Email::
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
  player: PropTypes.func.isRequired,
  userEmailAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEmailAction: (user, email) => dispatch(actionLogin(user, email)),
  player: (assertions, score) => dispatch(actionPlayerScore(assertions, score)),
});

export default connect(null, mapDispatchToProps)(Login);
