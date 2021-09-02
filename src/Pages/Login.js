import React, { Component } from 'react';
import logo from '../trivia.png';
import Input from '../Components/Input';
import Button from '../Components/Button';
import fetchAPI from '../services/fetchAPI';
import { connect } from 'react-redux';
import { saveToken } from '../Redux/Action/index';

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
    const { history, getToken } = this.props;

    const data = await fetchAPI();

    getToken(data.token);
    localStorage.setItem('token', JSON.stringify(data.token));

    history.push('/trivia');
  }

  render() {
    const { email, name, emailValid, nameValid } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
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
          disabled={ !(emailValid && nameValid) }
          onClick={ this.handleClick }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: (token) => dispatch(saveToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
