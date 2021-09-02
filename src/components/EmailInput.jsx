import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EmailInput extends Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <label htmlFor="email-input">
        E-mail:
        <input
          data-testid="input-gravatar-email"
          value={ value }
          type="email"
          id="email-input"
          name="emailInput"
          onChange={ handleChange }
        />
      </label>
    );
  }
}

EmailInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;
