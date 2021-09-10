import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const { type, id,
      label, testid, change, minLength,
      name, step, className, placeholder } = this.props;
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
          placeholder={ placeholder }
          className={ className }
          required
        />
      </label>
    );
  }
}

Input.propTypes = {
  change: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  step: PropTypes.string,
  testid: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Input.defaultProps = {
  testid: '',
  minLength: 1,
  name: '',
  step: '1',
};

// commit com o pull do main
