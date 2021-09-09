import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const { type, id, label, testid, change, minLength, name, step } = this.props;
    return (
      <label htmlFor={ id }>
        { label }
        <input
          data-testid={ testid }
          type={ type }
          id={ id }
          name={ name }
          onChange={ change }
          minLength={ minLength }
          step={ step }
          required
        />
      </label>
    );
  }
}

Input.propTypes = {
  change: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testid: PropTypes.string,
  type: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  name: PropTypes.string,
  step: PropTypes.string,
};

Input.defaultProps = {
  testid: '',
  minLength: 1,
  name: '',
  step: '1',
};

// commit com o pull do main
