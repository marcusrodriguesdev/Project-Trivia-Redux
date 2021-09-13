import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import configIcon from '../config-icon.svg';

class ConfigButton extends Component {
  render() {
    return (
      <Link data-testid="btn-settings" to="/config" className="config-icon">
        <img src={ configIcon } alt="Config Icon" />
      </Link>
    );
  }
}

export default ConfigButton;
