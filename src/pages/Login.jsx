import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getTokenThunk } from '../redux/actions';
import Input from '../components/Input';
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
    this.renderInputs = this.renderInputs.bind(this);
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

  renderInputs() {
    const { name, email } = this.state;

    return (

      <div>
        <Input
          labelTitle=""
          testID="input-gravatar-email"
          placeholder="exemplo@exemplo.com"
          type="email"
          name="email"
          id="email"
          value={ email }
          onChange={ this.handleChange }
        />

        <Input
          labelTitle=""
          testID="input-player-name"
          placeholder=""
          type="name"
          name="name"
          id="name"
          value={ name }
          onChange={ this.handleChange }
        />
      </div>
    );
  }

  render() {
    const { validEmail, validName } = this.state;
    return (
    //   <img src={ trivia } alt="trivia" />
      <form>
        {this.renderInputs()}
        <Link
          to="/game"
        >
          <button
            type="button"
            disabled={ !validEmail || !validName }
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
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
