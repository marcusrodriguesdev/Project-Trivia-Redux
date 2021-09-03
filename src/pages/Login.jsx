import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getToken, saveName } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
    const { getTokenProps } = this.props;
    const { getPlayerName } = this.props;
    const { validEmail, validName, name } = this.state;
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
        <Link onClick={ () => (getPlayerName(name)) } to="/game">
          <button
            disabled={ !validName || !validEmail }
            type="button"
            data-testid="btn-play"
            onClick={ getTokenProps }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTokenProps: () => dispatch(getToken()),
  getPlayerName: (name) => dispatch(saveName(name)),
});

Login.propTypes = {
  getPlayerName: PropTypes.func.isRequired,
  getTokenProps: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
