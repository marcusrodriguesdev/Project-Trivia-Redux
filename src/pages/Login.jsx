import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import NameInput from '../components/NameInput';
import EmailInput from '../components/EmailInput';
import logo from '../TRIVIA GAME.png';
import PlayButton from '../components/PlayButton';
import ConfigButton from '../components/ConfigButton';
import RankingButton from '../components/RankingButton';
import { fetchTokenThunk } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchToken } = this.props;
    fetchToken();
  }

  componentDidUpdate() {
    const { token } = this.props;
    if (token.length > 0) {
      localStorage.setItem('token', token);
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div className="App">
        <header className="main-container">
          <ConfigButton />
          <img src={ logo } className="logo" alt="logo" />
          <NameInput handleChange={ this.handleChange } value={ name } />
          <EmailInput handleChange={ this.handleChange } value={ email } />
          <PlayButton
            buttonCheck={ !(name.length && email.length) }
            playerName={ name }
            playerEmail={ email }
            history={ history }
          />
          <RankingButton />
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenThunk()),
});

const mapStateToProps = (state) => ({
  token: state.game.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  history: Proptypes.objectOf().isRequired,
  fetchToken: Proptypes.func.isRequired,
  token: Proptypes.string.isRequired,
};
