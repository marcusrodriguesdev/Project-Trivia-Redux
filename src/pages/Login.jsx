import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* name: '',
      email: '', */
      validName: false,
      validEmail: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { id, value } = target;
    const minNameLength = 3;
    if (id === 'name') {
      if (value.length >= minNameLength) {
        this.setState({
          validName: true,
          [id]: value,
        });
      } else {
        this.setState({
          validName: false,
          [id]: '',
        });
      }
    } else {
      const emailRegex = /[a-z]+@[a-z]+.com/g;
      if (emailRegex.test(value)) {
        this.setState({
          validEmail: true,
          [id]: value,
        });
      } else {
        this.setState({
          validEmail: false,
          [id]: '',
        });
      }
    }
  }

  render() {
    const { validEmail, validName } = this.state;
    return (
      <form>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ !validName || !validEmail }
          type="button"
          data-testid="btn-play"
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default connect()(Login);
