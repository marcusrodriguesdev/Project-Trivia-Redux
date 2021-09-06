import React from 'react';
import PropTypes from 'prop-types';

const InputCard = ({ labelText, id, name, type, value, onChange }) => (
  <label htmlFor={ id }>
    { labelText }
    <input
      id={ id }
      name={ name }
      type={ type }
      value={ value }
      data-testid={ id }
      onChange={ onChange }
    />
  </label>
);

InputCard.propTypes = {
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputCard;
