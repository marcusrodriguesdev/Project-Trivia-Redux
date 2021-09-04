import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import logo from '../trivia.png';
import { getTokenApi, setEmail } from '../actions';

class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleOnClick() {
    const { getApiToken, propSetEmail } = this.props;
    propSetEmail(this.state);
    getApiToken();
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
            <button type="button" data-testid="btn-settings">
              <Link to="/gameConfig"> Config </Link>
            </button>
            <Link to="/game">
              <button
                type="button"
                data-testid="btn-play"
                disabled={ !(name && email) }
                onClick={ this.handleOnClick }
              >
                Jogar
              </button>
            </Link>
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
  getApiToken: PropTypes.func.isRequired,
  propSetEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getApiToken: () => dispatch(getTokenApi()),
  propSetEmail: (payload) => dispatch(setEmail(payload)),
});

export default connect(null, mapDispatchToProps)(login);
