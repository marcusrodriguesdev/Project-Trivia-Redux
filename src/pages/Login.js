import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      buttonClick: false,
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.submitClick = this.submitClick.bind(this);
  }

  validateEmail(event) {
    const userEmail = event.target.value;
    const caractersPassword = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (caractersPassword.test((userEmail))) {
      return this.setState({
        email: userEmail,
      });
    }
    return this.setState({
      email: '',
    });
  }

  validateName(event) {
    const userName = event.target.value;
    if (userName.length >= 1) {
      return this.setState({
        name: userName,
      });
    }
    return this.setState({
      name: '',
    });
  }

  submitClick() {
    return this.setState({
      buttonClick: true,
    });
  }

  render() {
    const { email, name, buttonClick } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              id="name"
              type="text"
              onChange={ this.validateName }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              onChange={ this.validateEmail }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !name || !email }
            onClick={ this.submitClick }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
