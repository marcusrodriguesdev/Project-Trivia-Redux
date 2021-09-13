import PropTypes from 'prop-types';
import React from 'react';

const Select = (props) => {
  const { labelText, id, value, change, name, options } = props;

  return (
    <div className="field, selectClass">
      <div>
        <div className="selectLabel">
          <label htmlFor={ id }>
            {labelText}
          </label>
        </div>
        <div className="select is-rounded">
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
        </div>
      </div>
    </div>
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
