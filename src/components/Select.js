import PropTypes from 'prop-types';
import React from 'react';

const Select = (props) => {
  const { labelText, id, value, change, name, options } = props;

  return (
    <label htmlFor={ id }>
      {labelText}
      <select
        id={ id }
        data-testid={ id }
        value={ value }
        onChange={ change }
        name={ name }
      >
        {
          options.map((option) => <option key={ option }>{option}</option>)
        }
      </select>
    </label>
  );
};

Select.propTypes = {
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  change: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Select.defaultProps = {
  value: 'Not found',
};

export default Select;
