import React from 'react';

class Configuration extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      dificulty: [],
      type: [],
    };

    this.renderSelect = this.renderSelect.bind(this);
  }

  renderSelect() {
    return (
      <select>
        <option></option>
        <option></option>
        <option></option>
      </select>
    );
  }

  render() {
    return (
      <h1 data-testid="settings-title">Tela de configurações</h1>
    );
  }
}

export default Configuration;
