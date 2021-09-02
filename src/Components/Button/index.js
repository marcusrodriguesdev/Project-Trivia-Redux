import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { onClick, id, dataTest, text, disabled } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ disabled }
        id={ id }
        data-testid={ dataTest }
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
  dataTest: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
}.isRequired;

export default Button;
