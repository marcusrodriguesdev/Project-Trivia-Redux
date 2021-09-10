import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const { text, name, onChange, options } = this.props;

    return (
      <label htmlFor={ name }>
        {text}
        <select id={ name } name={ name } onChange={ onChange }>
          <option value="">{`Any ${name}`}</option>
          {
            options.map((option) => (
              <option key={ option.id } value={ option.id }>{option.name}</option>
            ))
          }
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Select;
