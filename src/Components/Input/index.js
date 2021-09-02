import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { text, name, type, onChange, value, dataTest } = this.props;
    return (
      <label htmlFor={ name }>
        { text }
        <input
          data-testid={ dataTest }
          id={ name }
          name={ name }
          type={ type }
          onChange={ onChange }
          value={ value }
        />
      </label>
    );
  }
}

Input.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  dataTest: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired;

export default Input;
