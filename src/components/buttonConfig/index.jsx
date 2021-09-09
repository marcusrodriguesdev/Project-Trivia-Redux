import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ButtonConfig extends Component {
  render() {
    return (
      <div>
        <Link to="/ConfigPage">
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.redirectConfigPage }
            className="btn btn-config"
          >
            <p data-testid="settings-title"> ConfigPage </p>
          </button>
        </Link>
      </div>
    );
  }
}
