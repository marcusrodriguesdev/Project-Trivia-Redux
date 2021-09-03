import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getTokenThunk } from '../redux/actions';
import ConfigButton from '../components/ConfigButton';
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
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    const { fetchToken } = this.props;
    fetchToken();
  }

  render() {
    const { name, email, validEmail, validName } = this.state;
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
        <ConfigButton
          link="/game"
          test="btn-play"
          name="Jogar"
          onClick={ this.handleClick }
          disable={ !validEmail || !validName }
        />
        <ConfigButton
          link="/config"
          test="btn-settings"
          name="Configurações"
          onClick={ null }
          disable={ false }
        />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(getTokenThunk()),
});

Login.propTypes = {
  fetchToken: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
