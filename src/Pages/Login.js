import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../Components/Input';
import Button from '../Components/Button';
import fetchAPI from '../services/fetchAPI';
import logo from '../trivia.png';
import { addName, saveToken, fetchUrlGravatar } from '../Redux/Action';
import {
  saveToLocalStorage,
  setPlayerInLocalStorage,
} from '../helpers/localStorage';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      emailValid: false,
      nameValid: false,
    };

    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  handleEmail({ target }) {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
    const emailValid = email.test(target.value);

    this.setState({
      email: target.value,
      emailValid,
    });
  }

  handleName({ target }) {
    const NUMBER_THREE = 3;
    if (target.value.length >= NUMBER_THREE) {
      this.setState({
        nameValid: true,
      });
    }
    this.setState({
      name: target.value,
    });
  }

  async handleClick() {
    const { history, getName, getToken, fetchURL } = this.props;
    const { name, email } = this.state;

    getName(name);

    const data = await fetchAPI();

    getToken(data.token);
    saveToLocalStorage(data.token, 'token');
    setPlayerInLocalStorage();
    fetchURL(email);

    history.push('/trivia');
  }

  handleSettings() {
    const { history } = this.props;

    history.push('/settings');
  }

  render() {
    const { email, name, emailValid, nameValid } = this.state;
    return (
      <div className="App-body">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <div className="login-form-container">
          <div className="login-form">
            <Input
              name="name"
              dataTest="input-player-name"
              text="Nome: "
              onChange={ this.handleName }
              value={ name }
            />
            <Input
              name="email"
              dataTest="input-gravatar-email"
              text="Email: "
              onChange={ this.handleEmail }
              value={ email }
            />
            <Button
              text="Jogar"
              dataTest="btn-play"
              id="btn-play"
              disabled={ !(emailValid && nameValid) }
              onClick={ this.handleClick }
            />
            <Button
              text="Configurações"
              dataTest="btn-settings"
              id="btn-settings"
              onClick={ this.handleSettings }
            />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.func),
  getToken: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getToken: (token) => dispatch(saveToken(token)),
  getName: (name) => dispatch(addName(name)),
  fetchURL: (email) => dispatch(fetchUrlGravatar(email)),
});

export default connect(null, mapDispatchToProps)(Login);
