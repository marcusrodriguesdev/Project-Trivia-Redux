import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import logo from '../trivia.png';

class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.redirectToGamePage = this.redirectToGamePage.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  redirectToGamePage() {
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div>
            <Input
              label="Nome"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              testId="input-player-name"
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              testId="input-gravatar-email"
            />

            <button
              type="button"
              data-testid="btn-play"
              disabled={ !(name && email) }
              onClick={ this.redirectToGamePage }
            >
              Jogar
            </button>
          </div>
        </header>
      </div>
    );
  }
}

login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default login;
