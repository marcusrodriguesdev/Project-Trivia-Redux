import React from 'react';
import Home from './Home';
import logo from '../trivia.png';

// requisito 1
class Login extends React.Component {
  render() {
    return (

      <>
        <img src={ logo } className="App-logo" alt="logo" />
        <h1>Login</h1>
        <form>
          <fieldset>Xablau
            <label></label>
          </fieldset>
        </form>
      </>

    );
  }
}

export default Login;
