import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';

import './style.css';

class Input extends Component {
  render() {
    const { placeholder, type, name, value, onChange, validation } = this.props;

    return (
      <div className="input-container">
        <div className="icon-section">
          {name === 'name' ? <AiOutlineUser /> : <AiOutlineMail />}
        </div>
        <div className="input-section">
          <input
            className="game-input"
            aria-label={ placeholder }
            placeholder={ placeholder }
            type={ type }
            name={ name }
            value={ value }
            onChange={ onChange }
            data-validation={ validation }
          />
          <div className="outline" />
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  validation: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
