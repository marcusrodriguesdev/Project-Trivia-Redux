import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fecthApiToken from '../services/fetchApiToken';
import { userLogin } from '../Redux/action/index';
import '../styles/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      validation: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.onFecthToken = this.onFecthToken.bind(this);
  }

  async onFecthToken() {
    const { history, setUser } = this.props;
    const { name, email } = this.state;
    const user = { name, email };
    setUser(user);
    const token = await fecthApiToken();

    localStorage.setItem('token', JSON.stringify(token));
    history.push('/Game');
  }

  inputValidation() {
    const { name, email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    if (name.length > 0 && email.length > 0 && regex.test(email)) {
      this.setState({ validation: false });
    } else {
      this.setState({ validation: true });
    }
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.inputValidation());
  }

  render() {
    const { name, email, validation } = this.state;
    return (
      <div className="login">
        <form className="main-form">
          <label htmlFor="name">
            <input
              data-testid="input-player-name"
              className="input-text-name"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
              placeholder="Digite seu Nome"
            />
          </label>
          <label htmlFor="email">
            <input
              className="input-text-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="Digite seu Email"
            />
          </label>
          <button
            type="button"
            className={ !validation && 'play-button' }
            data-testid="btn-play"
            disabled={ validation }
            onClick={ this.onFecthToken }
          >
            PLAY
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
              className="btn-settings"
            >
              Settings
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(userLogin(user)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.objectOf(String),
  setUser: PropTypes.func,
}.isRequired;
