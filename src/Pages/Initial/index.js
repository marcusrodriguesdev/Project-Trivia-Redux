import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Login from '../../actions';

class Initial extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  }

  handleChange({ target }) {
    const { value, id } = target;
    const { name, email } = this.state;
    if (name && email && value) {
      this.setState({
        [id]: value,
        disable: false,
      });
    } else {
      this.setState({
        [id]: value,
        disable: true,
      });
    }
  }

  async sendLogin() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();

    localStorage.setItem('token', token.token);

    const { name, email } = this.state;
    const { Login: LoginAction } = this.props;
    LoginAction(name, email);
  }

  render() {
    const { name, email, disable } = this.state;
    return (
      <div>
        <input
          id="name"
          data-testid="input-player-name"
          type="text"
          onChange={ this.handleChange }
          placeholder="Name"
          value={ name }
        />

        <input
          id="email"
          data-testid="input-gravatar-email"
          type="text"
          onChange={ this.handleChange }
          placeholder="E-mail"
          value={ email }
        />

        <button
          data-testid="btn-play"
          type="button"
          disabled={ disable }
          onClick={ this.sendLogin }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Login: (name, email) => dispatch(Login(name, email)),
});

Initial.propTypes = {
  Login: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Initial);
