import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ConfigButton extends Component {
  render() {
    const { link, test, name, onClick, disable } = this.props;
    return (
      <Link to={ link }>
        <button
          data-testid={ test }
          type="button"
          onClick={ onClick }
          disabled={ disable }
        >
          { name }
        </button>
      </Link>
    );
  }
}

ConfigButton.propTypes = ({
  link: PropTypes.string,
  test: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  disable: PropTypes.bool,
}).isRequired;

ConfigButton.defaultProps = {
  // link: '',
  disable: false,
};

export default ConfigButton;
