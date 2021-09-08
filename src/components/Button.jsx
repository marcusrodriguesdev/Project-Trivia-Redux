import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { text, func, name, disable, dataTestId, className } = this.props;
    return (
      <button
        type="button"
        className={ className }
        onClick={ func }
        name={ name }
        disabled={ disable }
        data-testid={ dataTestId }
      >
        { text }
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
};
