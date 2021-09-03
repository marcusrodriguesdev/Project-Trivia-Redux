import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import fetchToken from '../services/fetchToken';
import getToken from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.infoCheck = this.infoCheck.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { tokenData } = this.props;
    tokenData(fetchToken());
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), this.infoCheck);
  }

  infoCheck() {
    const { name, email } = this.state;
    const isDisable = !(name.length > 0 && email.length > 0);
    this.setState({ isDisable });
  }

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            LOGIN
          </p>
          <form>
            <label htmlFor="name">
              Nome:
              <input
                data-testid="input-player-name"
                type="text"
                id="name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                data-testid="input-gravatar-email"
                type="text"
                id="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="btn-play"
              type="button"
              onClick={ (this.handleChange, this.onClick) }
              disabled={ isDisable }
            >
              Jogar
            </button>
          </form>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  tokenData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  tokenData: (token) => dispatch(getToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
