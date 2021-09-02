import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ConfigButton extends Component {
  render() {
    console.log(this.props);
    return (
      <Link data-testid="btn-settings" to="/config">Configurações</Link>
    );
  }
}

export default ConfigButton;
