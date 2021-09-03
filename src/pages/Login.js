import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { login, requestTokenThunk } from '../redux/actions';
import fetchToken from '../services/tokenAPI';

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

  // componentDidMount() {
  //   const { token } = this.props;
  //   localStorage.setItem('token', JSON.stringify(token()));
  // }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    const { email, nome } = this.state;
    const VALIDATE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const VALID_EMAIL = VALIDATE_EMAIL.test(email);
    const MIN_CHAR = 3;
    if (nome.length > MIN_CHAR && VALID_EMAIL) {
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
    // const { nome, email } = this.state;

    const data = await fetchToken();
    getToken(data.token);
    localStorage.setItem('token', JSON.stringify(data.token));
    getUser(this.state);
    // getUser(email);
    history.push('/game');
    // r2
  }

  render() {
    const { nome, email, disabled } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            <label htmlFor="nome">
              <input
                id="nome"
                type="text"
                name="nome"
                value={ nome }
                data-testid="input-player-name"
                placeholder="Nome"
                onChange={ this.handleChange }
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

            <button type="button" data-testid="btn-settings">
              <Link to="/settings"> Configurações </Link>
            </button>
          </p>
        </header>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(requestTokenThunk()),
  getUser: (payload) => dispatch(login(payload)),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
});

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
