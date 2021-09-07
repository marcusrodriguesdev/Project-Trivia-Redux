import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CorrectButt extends Component {
  render() {
    const { correct, onClick, name } = this.props;
    return (
      <div>
        <button
          className="btn-correct"
          onClick={ onClick }
          type="button"
          data-testid="correct-answer"
          name={ name }
        >
          { correct }
        </button>
      </div>
    );
  }
}
CorrectButt.propTypes = {
  correct: PropTypes.string.isRequired,
};