import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NameInput extends Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <div className="input-div">
        <label htmlFor="name-input">
          Nome:
          <input
            data-testid="input-player-name"
            value={ value }
            type="text"
            id="name-input"
            name="name"
            onChange={ handleChange }
            className="input"
          />
        </label>
      </div>
    );
  }
}

NameInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;
