import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import { logged, setScore } from '../redux/actions';

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

  componentDidMount() {
    const { getScore } = this.props;
    getScore(0);
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

  async token() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', result.token);
  }

  handleClick() {
    const { history, getInfo } = this.props;
    const { name, email } = this.state;
    this.token();
    getInfo(name, email);
    history.push('/trivia');
  }

  render() {
    const { btnStatus } = this.state;
    const { history } = this.props;

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
        <Button
          label="Configurações"
          testid="btn-settings"
          click={ () => history.push('/settings') }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getInfo: (name, email) => dispatch(logged(name, email)),
  getScore: (score) => dispatch(setScore(score)),
});

Login.propTypes = {
  getInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
