import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchToken as FetchTokenAction } from '../Redux/Actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { username, email } = this.state;
    const { fetchToken } = this.props;
    return (
      <div>
        <fieldset>
          <label htmlFor="name-input">
            Nome:
            <input
              type="text"
              id="name-input"
              data-testid="input-player-name"
              name="username"
              onChange={ this.handleChanges }
              value={ username }
            />
          </label>
          <label htmlFor="email-input">
            Email:
            <input
              type="email"
              id="email-input"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChanges }
            />
          </label>
          <Link to="/Game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !(email && username) }
              onClick={ fetchToken }
            >
              Jogar
            </button>
          </Link>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(FetchTokenAction()),
});

export default connect(null, mapDispatchToProps)(Login);
