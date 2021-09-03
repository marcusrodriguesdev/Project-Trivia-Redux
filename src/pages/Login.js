import React from 'react';
import logo from '../trivia.png';
import ButtonConfig from '../components/ButtonConfig/Index';
import StopWatch from '../components/StopWatch/Index';
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
  }

  handleChange(event) {
    const { value, name } = event.target;
    console.log(event.target.name);
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

  render() {
    const { emailValidation, userValidation } = this.state;
    return (

      <>
        <img src={ logo } className="App-logo" alt="logo" />
        <h1>Login</h1>
        <form>
          <fieldset>
            <label htmlFor="user">
              <input
                id="user"
                type="text"
                name="user"
                placeholder="User"
                data-testid="input-player-name"
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="email">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                data-testid="input-gravatar-email"
                required
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="btn-play"
              disabled={ userValidation || emailValidation }
            >
              Entrar
            </button>
            <ButtonConfig />
            <StopWatch />
          </fieldset>
        </form>
      </>

    );
  }
}

export default Login;
