import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestionsThunk, fetchStartThunk, saveFormData } from '../../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
      emailLogin: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.startGame = this.startGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    const { token, history, getQuestions } = this.props;
    if (token) {
      getQuestions({ token });
      localStorage.setItem('token', token);
      history.push('/game');
    }
  }

  handleClick() {
    const { history } = this.props;
    history.push('/config');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  disabledButton() {
    const { nameLogin, emailLogin } = this.state;
    if (nameLogin !== '' && emailLogin.includes('@' && '.com')) {
      return false;
    }
    return true;
  }

  startGame() {
    const { gameStart, saveData } = this.props;
    saveData(this.state);
    gameStart();
  }

  render() {
    const { nameLogin, emailLogin } = this.state;
    return (
      <div>
        <form action="">
          <label htmlFor="nome-login">
            Nome:
            <input
              value={ nameLogin }
              data-testid="input-player-name"
              type="text"
              name="nameLogin"
              id="nome-login"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-login">
            Email:
            <input
              value={ emailLogin }
              data-testid="input-gravatar-email"
              type="email"
              name="emailLogin"
              id="email-login"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ this.disabledButton() }
            data-testid="btn-play"
            type="button"
            onClick={ this.startGame }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClick }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.defaultProptype = {
  login: '',
};

Login.propTypes = {
  gameStart: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveData: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getQuestions: ({ token }) => dispatch(fetchQuestionsThunk({ token })),
  saveData: (state) => dispatch(saveFormData(state)),
  gameStart: () => dispatch(fetchStartThunk()),
});

const mapStateToProps = (state) => ({
  token: state.login.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
