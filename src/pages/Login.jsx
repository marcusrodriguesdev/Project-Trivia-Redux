import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import { getToken, logged } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      btnStatus: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  validateButton() {
    const { name: stateName, email } = this.state;

    if (stateName === '' || email === '') {
      this.setState({ btnStatus: true });
    } else {
      this.setState({ btnStatus: false });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      this.validateButton();
    });
  }

  handleClick() {
    const { token, history, getInfo } = this.props;
    const { name } = this.state;
    token();
    getInfo(name);
    history.push('/trivia');
  }

  render() {
    const { btnStatus } = this.state;

    return (
      <div>
        <Input
          type="text"
          testid="input-player-name"
          id="name"
          label="Name"
          name="name"
          change={ this.handleChange }
        />
        <Input
          type="email"
          testid="input-gravatar-email"
          id="email"
          label="Email"
          name="email"
          change={ this.handleChange }
        />
        <Button
          label="Jogar"
          type="button"
          click={ this.handleClick }
          testid="btn-play"
          disable={ btnStatus }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  token: () => dispatch(getToken()),
  getInfo: (value) => dispatch(logged(value)),
});

Login.propTypes = {
  getInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  token: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
