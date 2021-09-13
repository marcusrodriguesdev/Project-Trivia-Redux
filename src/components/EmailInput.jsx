import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EmailInput extends Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <div className="input-div">
        <label htmlFor="email-input">
          E-mail:
          <input
            data-testid="input-gravatar-email"
            value={ value }
            type="email"
            id="email-input"
            name="email"
            onChange={ handleChange }
            className="input"
          />
        </label>
      </div>
    );
  }
}

EmailInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;
