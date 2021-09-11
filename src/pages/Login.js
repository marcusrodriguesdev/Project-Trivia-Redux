import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { login, requestTokenThunk } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      email: '',
      score: 0,
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    const { email, nome } = this.state;
    const VALIDATE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const VALID_EMAIL = VALIDATE_EMAIL.test(email);
    if (nome.length > 0 && VALID_EMAIL) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  async handleClick() {
    const { history, getToken, getUser } = this.props;
    getUser(this.state);
    getToken(history);
  }

  render() {
    const { nome, email, disabled } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div className="login-inputs">
            <label htmlFor="nome">
              <input
                id="nome"
                type="text"
                name="nome"
                value={ nome }
                data-testid="input-player-name"
                placeholder="Nome"
                onChange={ this.handleChange }
                autoComplete="off"
              />
            </label>
            <label htmlFor="email">
              <input
                id="email"
                type="text"
                name="email"
                value={ email }
                placeholder="exemplo@exemplo.com"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
                autoComplete="off"
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
            <Link to="/settings">
              <button type="button" data-testid="btn-settings">Configurações</button>
            </Link>
          </div>
        </header>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: (history) => dispatch(requestTokenThunk(history)),
  getUser: (payload) => dispatch(login(payload)),
});

const mapStateToProps = (state) => ({
  token: state.token.token.token,
});

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
