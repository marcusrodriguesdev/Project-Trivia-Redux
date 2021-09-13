import React from 'react';
import PropTypes from 'prop-types';

const InputCard = ({
  labelText,
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
}) => (
  <div className="field, formInput">
    <label htmlFor={ id } className="label, labelClass">
      { labelText }
      <div className="control">
        <input
          className="input is-rounded"
          id={ id }
          name={ name }
          type={ type }
          value={ value }
          data-testid={ id }
          onChange={ onChange }
          placeholder={ placeholder }
        />
      </div>
    </label>
  </div>
);

InputCard.propTypes = {
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputCard;
