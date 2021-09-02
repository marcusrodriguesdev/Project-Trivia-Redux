import React from 'react';
// import trivia from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      validName: false,
      validEmail: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    if (name === 'name') {
      this.setState({
        [name]: value,
        validName: true,
      });
    }
    if (name === 'email') {
      this.setState({
        [name]: value,
        validEmail: true,
      });
    }
  }

  render() {
    const { name, email, validEmail, validName } = this.state;
    console.log(validEmail);
    return (
    //   <img src={ trivia } alt="trivia" />
      <form>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="exemplo@exemplo.com"
          />
        </label>
        <label htmlFor="name">
          <input
            type="name"
            id="name"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !validEmail || !validName }
          data-testid="btn-play"
          onClick=""
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
