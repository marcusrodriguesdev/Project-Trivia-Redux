import React, { Component } from 'react';

export default class BtnWrong extends Component {
  render() {
    const { wrong, index } = this.props;
    return (
      <div>
        <button type="button" data-testid={ `wrong-answer-${index}` }>
          {wrong}
        </button>
      </div>
    );
  }
}
