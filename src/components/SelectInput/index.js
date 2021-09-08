import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectInput extends Component {
  render() {
    const { labelText, id, options, value, onChange } = this.props;

    return (
      <label htmlFor={ id }>
        {labelText}
        <select name={ id } id={ id } value={ value } onChange={ onChange }>
          {options.map(({ name, id: optionId }) => (
            <option key={ optionId } value={ optionId }>
              {name}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

SelectInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectInput;
