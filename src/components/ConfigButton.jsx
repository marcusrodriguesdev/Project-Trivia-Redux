import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConfigButton extends Component {
  render() {
    const { test, name, onClick, disable, className, hidden } = this.props;
    return (
      <button
        className={ className }
        data-testid={ test }
        type="button"
        onClick={ onClick }
        disabled={ disable }
        hidden={ hidden }
        name={ name }
      >
        { name }
      </button>
    );
  }
}

ConfigButton.propTypes = ({
  test: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  disable: PropTypes.bool,
  className: PropTypes.string,
  hidden: PropTypes.bool,
}).isRequired;

ConfigButton.defaultProps = {
  disable: false,
  className: '',
  hidden: false,
};

export default ConfigButton;
