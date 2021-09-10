import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { name, items, handleChange, text } = this.props;
    return (
      <label htmlFor={ name }>
        { `${text}: ` }
        <select name={ name } id={ name } onChange={ handleChange }>
          { items.map((item) => (
            <option
              key={ item.id }
              value={ item.id }
            >
              { item.name }
            </option>)) }
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  text: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Select;
