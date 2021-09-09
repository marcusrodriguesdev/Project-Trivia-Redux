import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Score extends Component {
  render() {
    const { score } = this.props;
    return (
      <div data-testid="header-score">
        { score }
      </div>
    );
  }
}

export default Score;

Score.propTypes = {
  score: PropTypes.number,
}.isRequired;
