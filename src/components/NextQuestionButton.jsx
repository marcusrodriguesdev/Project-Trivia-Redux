import React, { Component } from 'react';

class NextQuestionButton extends Component {
  render() {
    const { handleNextButton } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ handleNextButton }
      >
        Pŕoxima
      </button>
    );
  }
}

export default NextQuestionButton;
