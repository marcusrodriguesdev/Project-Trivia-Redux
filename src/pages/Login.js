import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import getTokenThunk from '../redux/actions';
import Button from '../components/Button';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.renderButton = this.renderButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { getToken } = this.props;
    const { name, email } = this.state;
    getToken(name, email);
  }

  renderButton(text, dataTestId, func, disable) {
    return (<Button
      text={ text }
      dataTestId={ dataTestId }
      func={ func }
      disable={ disable }
    />);
  }

  renderInputs() {
    const { name, email } = this.state;
    return (
      <div>
        <label htmlFor="input-player-name">
          Name:
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-player-name">
          Email:
          <input
            type="text"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }

  render() {
    const { name, email } = this.state;
    let handleButton = true;
    if (name && email) {
      handleButton = false;
    }
    return (
      <main>
        <form action="">
          {this.renderInputs()}
          <Link to="/gameplay">
            { this.renderButton(
              'Jogar', // text
              'btn-play', // data-test
              this.handleClick,
              handleButton, // disable
            ) }
          </Link>
          <Link to="/settings">
            { this.renderButton(
              'Configurações', // text
              'btn-settings', // data-test
            )}
          </Link>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: (name, email) => dispatch(getTokenThunk(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
