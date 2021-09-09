import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { setDataUser, fetchToken } from '../redux/actions';
import ButtonConfig from '../components/buttonConfig';

// requisito 1
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userValidation: true,
      emailValidation: true,
      user: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.formsComponent = this.formsComponent.bind(this);
  }

  setRanking() {
    const { user, email } = this.state;
    const localRanking = (
      JSON.parse(localStorage.getItem('ranking')) === null
        ? [] : JSON.parse(localStorage.getItem('ranking'))
    );
    const newLocalRanking = [...localRanking, { name: user, score: 0, picture: email }];
    localStorage.setItem('ranking', JSON.stringify(newLocalRanking));
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value }, () => {
      const { user, email } = this.state;
      const userValidation = user === '';
      const emailValidation = email === '';
      this.setState({
        userValidation,
        emailValidation,
      });
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { history, setData, setToken } = this.props;
    await setToken();
    history.push('/game');
    const userData = this.state;
    delete userData.emailValidation;
    delete userData.userValidation;
    setData(userData);
    this.setRanking();
  }

  formsComponent() {
    const { emailValidation, userValidation } = this.state;
    return (
      <form className="login-container-forms">
        <fieldset className="login-container-inputs">
          <label htmlFor="user">
            <input
              id="user"
              type="text"
              name="user"
              placeholder="User"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              required
              className="login-container-user"
            />
          </label>
          <label htmlFor="email" className="teste">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              data-testid="input-gravatar-email"
              required
              onChange={ this.handleChange }
              className="login-container-email"
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ userValidation || emailValidation }
            onClick={ this.handleClick }
            className="btn btn-login"
          >
            Jogar
          </button>
          <ButtonConfig />
        </fieldset>
      </form>
    );
  }

  render() {
    return (
      <div className="login-container">
        <img
          src={ logo }
          className="login-container-logo"
          alt="logo"
        />
        <h1 className="login-container-title">Login</h1>
        {
          this.formsComponent()
        }
      </div>

    );
  }
}

const mapDispatchToPros = (dispatch) => ({
  setData: (payload) => dispatch(setDataUser(payload)),
  setToken: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToPros)(Login);

Login.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
  setData: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};
