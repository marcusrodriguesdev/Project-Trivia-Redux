import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

import { MdSettings } from 'react-icons/md';

import { fetchToken, setGravatar, setPlayerData } from '../../redux/actions';
import { fetchCategoriesThunk } from '../../redux/actions/questionActions';

import './style.css';
import Button from '../../components/Button';
import Input from '../../components/Input';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      validName: false,
      validEmail: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getGravatar = this.getGravatar.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;

    getCategories();
  }

  getGravatar(email) {
    const gravatarHash = MD5(email).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${gravatarHash}`;
    return gravatarEmail;
  }

  handleChange({ target }) {
    const { value, name } = target;
    const { validation } = target.dataset;

    this.setState({
      [name]: value,
      [validation]: value.length > 0,
    });
  }

  handleClick(event) {
    const { fetch, token, history, setGravatarToState, setPlayerToState } = this.props;
    const { name, email } = this.state;

    event.preventDefault();
    fetch();

    const gravatarEmail = this.getGravatar(email);
    setGravatarToState(gravatarEmail);
    setPlayerToState(name, email);
    const playerDataString = JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
      },
    });
    // const rankingDataString = JSON.stringify([
    //   { name, score: 10, picture: gravatarEmail },
    // ]);
    // window.localStorage.setItem('ranking', rankingDataString);
    window.localStorage.setItem('state', playerDataString);
    window.localStorage.setItem('token', token);
    history.push('/game');
  }

  render() {
    const { name, email, validName, validEmail } = this.state;
    const { history } = this.props;

    return (
      <form className="login-form">
        <Input
          placeholder="Name"
          type="text"
          validation="validName"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />

        <Input
          placeholder="Email"
          type="email"
          validation="validEmail"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />

        <Button
          type="submit"
          disabled={ !validName || !validEmail }
          onClick={ this.handleClick }
          text="Play"
          color={ !validName || !validEmail ? '#8b8b8b' : undefined }
        />

        <div className="settings-button">
          <MdSettings onClick={ () => history.push('/settings') } />
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  fetch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setGravatarToState: PropTypes.func.isRequired,
  setPlayerToState: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchToken()),
  setGravatarToState: (gravatar) => dispatch(setGravatar(gravatar)),
  setPlayerToState: (name, email) => dispatch(setPlayerData(name, email)),
  getCategories: () => dispatch(fetchCategoriesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
