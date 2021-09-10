import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPlayerInfo, setPlayerQuestions } from '../actions';
import '../App.css';
import logo from '../trivia.png';
import { fetchPlayerImg, fetchPlayerToken, fetchQuestions } from '../services/apiHelper';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    const { history, sendToken, sendPlayer, settings } = this.props;
    const { email } = this.state;
    const token = await fetchPlayerToken();
    const questions = await fetchQuestions(token, settings);
    localStorage.setItem('token', token);
    sendToken(questions);

    const emailHash = md5(email).toString();
    fetchPlayerImg(emailHash)
      .then(({ url }) => {
        this.setState({
          avatar: url,
        }, () => {
          sendPlayer(this.state);
          history.push('/game');
        });
      });
  }

  render() {
    const { nome, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <label htmlFor="nome">
            Nome:
            <input
              type="text"
              name="nome"
              id="nome"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !email || !nome }
            onClick={ this.handleSubmit }
          >
            Jogar
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </header>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  sendToken: (payload) => dispatch(setPlayerQuestions(payload)),
  sendPlayer: (payload) => dispatch(setPlayerInfo(payload)),
});

const mapStateToProps = (state) => ({
  settings: state.user.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendPlayer: PropTypes.func.isRequired,
  sendToken: PropTypes.func.isRequired,
  settings: PropTypes.objectOf(PropTypes.object).isRequired,
};
