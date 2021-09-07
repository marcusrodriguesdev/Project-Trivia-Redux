import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NextButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button data-testid="btn-next" onClick={ onClick } type="button">Próxima</button>
    );
  }
}

export default NextButton;

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
