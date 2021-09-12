import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Button extends Component {
  render() {
    const {
      type,
      disabled,
      onClick,
      text,
      color,
      className,
      visibility,
    } = this.props;

    const style = {
      backgroundColor: color,
      visibility,
    };

    return (
      <button
        type={ type === 'submit' ? 'submit' : 'button' }
        disabled={ disabled }
        onClick={ onClick }
        style={ style }
        className={ `${className} game-button` }
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  visibility: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  visibility: 'visible',
  disabled: false,
  color: '',
};

export default Button;
