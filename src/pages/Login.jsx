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
  }

  handleChange({ target: { name, value } }) {
    const { name: stateName, email } = this.state;

    this.setState({
      [name]: value,
    }, () => {
      this.setState({ btnStatus: !stateName || !email ? true : false });
    });
  }

  render() {
    const { btnStatus } = this.state;

    return (
      <div>
        <Input
          type="text"
          testId="input-player-name"
          id="name"
          label="Name"
          name="name"
          change={ this.handleChange }
        />
        <Input
          type="email"
          testId="input-player-email"
          id="email"
          label="Email"
          name="email"
          change={ this.handleChange }
        />
        <Button
          label="Jogar"
          type="button"
          testeId="btn-play"
          disable={ btnStatus }
        />
      </div>
    );
  }
}

export default Login;
