import React, { Component } from 'react'

export default class BtnCorrect extends Component {
  render() {
    const { correct } = this.props;
    return (
      <div>
        <button type="button" data-testid="correct-answer">{ correct }</button>
      </div>
    );
  }
}
