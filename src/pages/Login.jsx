import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

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
          testid="btn-play"
          disable={ btnStatus }
        />
      </div>
    );
  }
}

export default Login;
