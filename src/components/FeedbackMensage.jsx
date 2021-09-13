import React, { Component } from 'react';

export default class FeedbackMensage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assertions: 0,
    };

    this.handleAssertions = this.handleAssertions.bind(this);
  }

  async componentDidMount() {
    this.handleAssertions();
  }

  handleAssertions() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = state;
    this.setState({ assertions });
  }

  render() {
    const { assertions } = this.state;
    const goodScore = 3;
    return (
      <div>
        <p data-testid="feedback-text" className="feedback-msg">
          { assertions >= goodScore ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
      </div>
    );
  }
}
