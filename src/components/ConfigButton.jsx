import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ConfigButton extends Component {
  render() {
    return (
      <Link data-testid="btn-settings" to="/config">Configurações</Link>
    );
  }
}

export default ConfigButton;
