import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTokenThunk, loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      validateEmail: false,
      validateName: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (name === 'email') {
      this.validateEmail(value);
    }
    if (name === 'name') {
      this.setState({
        validateName: value.length > 0,
      });
    }
  }

  handleClick(routeName) {
    const { history, setToken, setLoginInfo } = this.props;
    setToken();
    setLoginInfo(this.state);
    history.push(`/${routeName}`);
  }

  validateEmail(email) {
    const emailFormat = /^\S+@\S+\.\S+$/;
    const correctEmail = emailFormat.test(email);
    this.setState({ validateEmail: correctEmail });
  }

  render() {
    const { validateEmail, validateName } = this.state;
    return (
      <>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            id="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="text"
            name="email"
            id="email"
            onChange={ this.handleChange }
          />
        </label>

        <button
          data-testid="btn-play"
          type="button"
          disabled={ !validateEmail || !validateName }
          onClick={ () => this.handleClick('question') }
        >
          Jogar
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ () => this.handleClick('settings') }
        >
          Configurações
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(getTokenThunk()),
  setLoginInfo: (payload) => dispatch(loginAction(payload)),
});

Login.propTypes = {
  setLoginInfo: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
